<?php
/**
 * ============================================================
 * AchievementService - Engine de Conquistas
 * ============================================================
 * IMPLEMENTADO: Arquitetura_Proposta.md → Exemplo: AchievementService.php
 * 
 * Responsabilidades:
 * - Processar conquistas após partida
 * - Calcular progresso baseado em tipo (score, vitorias, cartas, etc)
 * - Atualizar tabela usuario_conquistas
 * - Disparar callbacks ao desbloquear
 * - Engine extensível (fácil adicionar novos tipos)
 * 
 * Tipos de Conquistas:
 * - score: pontos totais acumulados
 * - vitorias: número de vitórias
 * - cartas_jogadas: quantidade de cartas
 * - lixo_coletado: lixo total coletado
 * - streak: sequência de vitórias
 * - custom: lógica customizada por ID
 * 
 * ============================================================
 */

class AchievementService {
    
    // Engine de tipos - mapeia tipo para função processadora
    private static $engine = [];
    
    /**
     * Processar conquistas após uma partida
     * 
     * @param int $userId ID do usuário
     * @param string $resultado 'vitoria' ou 'derrota'
     * @param array $dados Dados da partida (score, lixo, etc)
     * @return array Conquistas desbloqueadas nesta partida
     */
    public static function processar(int $userId, string $resultado, array $dados): array {
        global $pdo;
        if (!isset($pdo)) {
            require_once __DIR__ . '/../config/db.php';
        }
        
        $conquistasNovas = [];
        
        try {
            // Obter todas as conquistas
            $stmt = $pdo->prepare("
                SELECT c.*, COALESCE(uc.progresso_atual, 0) as progresso_atual
                FROM conquistas c
                LEFT JOIN usuario_conquistas uc ON c.idConquista = uc.idConquista AND uc.idUsuario = ?
                ORDER BY c.idConquista
            ");
            $stmt->execute([$userId]);
            $conquistas = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            foreach ($conquistas as $conquista) {
                // Calcular novo progresso baseado no tipo
                $tipoConquista = $conquista['tipoConquista'] ?? 'custom';
                $novoProgresso = self::calcularProgresso($tipoConquista, $conquista, $dados, $userId);
                
                // Se progresso mudou
                if ($novoProgresso > ($conquista['progresso_atual'] ?? 0)) {
                    // Verificar se desbloqueou
                    $jaDesbloqueada = isset($conquista['desbloqueada']) && $conquista['desbloqueada'] == 1;
                    $agoraDesbloqueada = $novoProgresso >= $conquista['metaConquista'];
                    
                    // Inserir ou atualizar progresso
                    if (isset($conquista['progressoAtual'])) {
                        // Atualizar existente
                        $stmtUpd = $pdo->prepare("
                            UPDATE usuario_conquistas
                            SET progresso_atual = ?, desbloqueada = ?
                            WHERE idUsuario = ? AND idConquista = ?
                        ");
                        $stmtUpd->execute([
                            min($novoProgresso, $conquista['metaConquista']),
                            $agoraDesbloqueada ? 1 : 0,
                            $userId,
                            $conquista['idConquista']
                        ]);
                    } else {
                        // Inserir novo registro
                        $stmtIns = $pdo->prepare("
                            INSERT INTO usuario_conquistas 
                            (idUsuario, idConquista, progresso_atual, desbloqueada, dataDesbloqueio)
                            VALUES (?, ?, ?, ?, ?)
                        ");
                        $stmtIns->execute([
                            $userId,
                            $conquista['idConquista'],
                            min($novoProgresso, $conquista['metaConquista']),
                            $agoraDesbloqueada ? 1 : 0,
                            $agoraDesbloqueada ? date('Y-m-d H:i:s') : null
                        ]);
                    }
                    
                    // Se desbloqueou AGORA (não era antes)
                    if ($agoraDesbloqueada && !$jaDesbloqueada) {
                        $conquistasNovas[] = [
                            'idConquista' => $conquista['idConquista'],
                            'nome' => $conquista['nomeConquista'],
                            'descricao' => $conquista['descricaoConquista'],
                            'icone' => $conquista['iconeConquista'],
                            'pontos' => $conquista['pontosBonusConquista']
                        ];
                        
                        // Adicionar pontos bonus
                        $pontos = intval($conquista['pontosBonusConquista'] ?? 0);
                        if ($pontos > 0) {
                            $stmtPontos = $pdo->prepare("
                                UPDATE usuarios SET pontuacaoTotal = pontuacaoTotal + ?
                                WHERE idUsuario = ?
                            ");
                            $stmtPontos->execute([$pontos, $userId]);
                        }
                    }
                }
            }
            
        } catch (Exception $e) {
            // Log erro mas não falha
            error_log('Erro ao processar conquistas: ' . $e->getMessage());
        }
        
        return $conquistasNovas;
    }
    
    /**
     * Calcular progresso baseado em tipo de conquista
     * 
     * @param string $tipo Tipo de conquista (score, vitorias, cartas, lixo, streak, custom)
     * @param array $conquista Dados da conquista
     * @param array $dados Dados da partida
     * @param int $userId ID do usuário
     * @return int Novo valor de progresso
     */
    private static function calcularProgresso(
        string $tipo,
        array $conquista,
        array $dados,
        int $userId
    ): int {
        global $pdo;
        
        switch ($tipo) {
            case 'score':
                // Progresso baseado em score total
                $stmt = $pdo->prepare("
                    SELECT SUM(pontuacao) as totalScore
                    FROM partidas
                    WHERE idUsuario = ?
                ");
                $stmt->execute([$userId]);
                $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
                return intval($resultado['totalScore'] ?? 0);
            
            case 'vitorias':
                // Progresso baseado em vitórias
                if (($dados['resultado'] ?? '') === 'vitoria') {
                    return ($conquista['progresso_atual'] ?? 0) + 1;
                }
                return $conquista['progresso_atual'] ?? 0;
            
            case 'cartas_jogadas':
                // Progresso baseado em cartas
                $stmt = $pdo->prepare("
                    SELECT SUM(cartasJogadas) as totalCartas
                    FROM partidas
                    WHERE idUsuario = ?
                ");
                $stmt->execute([$userId]);
                $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
                return intval($resultado['totalCartas'] ?? 0);
            
            case 'lixo_coletado':
                // Progresso baseado em lixo
                $stmt = $pdo->prepare("
                    SELECT SUM(lixoReciclado) as totalLixo
                    FROM partidas
                    WHERE idUsuario = ?
                ");
                $stmt->execute([$userId]);
                $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
                return intval($resultado['totalLixo'] ?? 0);
            
            case 'streak':
                // Progressivo de vitórias consecutivas
                return self::calcularStreak($userId, $dados);
            
            case 'custom':
            default:
                // Lógica customizada por ID
                return self::processarCustom($conquista['idConquista'], $userId, $dados);
        }
    }
    
    /**
     * Calcular streak (vitórias consecutivas)
     * 
     * @param int $userId ID do usuário
     * @param array $dados Dados da partida atual
     * @return int Streak atual
     */
    private static function calcularStreak(int $userId, array $dados): int {
        global $pdo;
        
        // Se perdeu, streak = 0
        if (($dados['resultado'] ?? '') !== 'vitoria') {
            return 0;
        }
        
        // Contar últimas vitórias consecutivas
        $stmt = $pdo->prepare("
            SELECT resultado
            FROM partidas
            WHERE idUsuario = ?
            ORDER BY dataCriacao DESC
            LIMIT 10
        ");
        $stmt->execute([$userId]);
        $partidas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        $streak = 0;
        foreach ($partidas as $p) {
            if ($p['resultado'] === 'vitoria') {
                $streak++;
            } else {
                break;
            }
        }
        
        return $streak;
    }
    
    /**
     * Processar conquista com lógica customizada
     * 
     * @param int $conquistaId ID da conquista
     * @param int $userId ID do usuário
     * @param array $dados Dados da partida
     * @return int Novo progresso
     */
    private static function processarCustom(int $conquistaId, int $userId, array $dados): int {
        global $pdo;
        
        // Exemplos de lógicas customizadas por ID:
        // ID 1: "Primeiro passos" - desbloqueia ao terminar 1ª partida
        // ID 2: "Reciclador" - desbloqueia ao coletar 1000 lixo
        // etc
        
        // Por enquanto, retorna o progresso atual
        $stmt = $pdo->prepare("
            SELECT progresso_atual
            FROM usuario_conquistas
            WHERE idConquista = ? AND idUsuario = ?
        ");
        $stmt->execute([$conquistaId, $userId]);
        $resultado = $stmt->fetch(PDO::FETCH_ASSOC);
        
        return intval($resultado['progresso_atual'] ?? 0);
    }
}

?>
