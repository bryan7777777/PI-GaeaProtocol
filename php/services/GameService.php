<?php
/**
 * ============================================================
 * GameService - Lógica de Partidas
 * ============================================================
 * IMPLEMENTADO: Arquitetura_Proposta.md → Exemplo: GameService.php
 * 
 * Responsabilidades:
 * - Registrar partidas com idempotência via session_token
 * - Validar payloads de partida
 * - Atualizar estatísticas do usuário
 * - Processar conquistas automáticas
 * - Log de auditoria
 * 
 * Dependências:
 * - PDO (banco de dados)
 * - AchievementService (processar conquistas)
 * 
 * ============================================================
 */

require_once __DIR__ . '/AchievementService.php';

class GameService {
    private $pdo;
    private $userId;
    
    /**
     * Construtor
     * 
     * @param PDO $pdo Instância de conexão PDO
     * @param int $userId ID do usuário (obrigatório via sessão)
     */
    public function __construct(PDO $pdo, ?int $userId = null) {
        $this->pdo = $pdo;
        
        // Obter userID da sessão se não fornecido
        if ($userId === null) {
            session_start();
            $this->userId = $_SESSION['usuario_id'] ?? null;
        } else {
            $this->userId = $userId;
        }
        
        if (!$this->userId) {
            throw new Exception('Usuário não autenticado', 401);
        }
    }
    
    /**
     * Registra uma partida com garantia de idempotência
     * 
     * @param array $dados Payload da partida (ver validarPayload)
     * @return array Resposta com ID da partida ou status de duplicata
     * @throws Exception Em caso de validação ou erro de BD
     */
    public function registrarPartida(array $dados): array {
        // ✅ VALIDAÇÃO
        $this->validarPayload($dados);
        
        // ✅ VERIFICAR DUPLICATA (idempotência)
        if (isset($dados['session_token'])) {
            $existente = $this->obterPorSessionToken($dados['session_token']);
            if ($existente) {
                // Retorna sucesso mas não insere duplicata
                return [
                    'duplicata' => true,
                    'idPartida' => $existente['idPartida'],
                    'mensagem' => 'Partida já registrada (retry)'
                ];
            }
        }
        
        // ✅ INICIAR TRANSAÇÃO
        $this->pdo->beginTransaction();
        
        try {
            // ✅ NORMALIZAR DADOS
            $resultado = strtolower(trim($dados['resultado'] ?? ''));
            $faseAtual = intval($dados['fase_atual'] ?? 0);
            
            // Validação server-side: vitória só se chegou na fase final
            if ($resultado === 'vitoria' && $faseAtual < 35) {
                $resultado = 'derrota';
            }
            
            if (!in_array($resultado, ['vitoria', 'derrota'])) {
                throw new Exception('Resultado inválido: deve ser "vitoria" ou "derrota"', 400);
            }
            
            // ✅ PREPARAR DADOS PARA INSERT
            $score = intval($dados['score'] ?? 0);
            $tempoJogo = intval($dados['tempo_jogo'] ?? 0);
            $lixoColetado = intval($dados['lixo_coletado'] ?? 0);
            $cartasJogadas = intval($dados['cartas_jogadas'] ?? 0);
            $sessionToken = $dados['session_token'] ?? bin2hex(random_bytes(32));
            
            // ✅ INSERT PARTIDA
            $stmt = $this->pdo->prepare("
                INSERT INTO partidas (
                    idUsuario, resultado, pontuacao, tempoJogo, faseAtual,
                    lixoReciclado, cartasJogadas, session_token, dataCriacao
                ) VALUES (
                    :idUsuario, :resultado, :pontuacao, :tempoJogo, :faseAtual,
                    :lixoReciclado, :cartasJogadas, :session_token, NOW()
                )
            ");
            
            $stmt->execute([
                ':idUsuario' => $this->userId,
                ':resultado' => $resultado,
                ':pontuacao' => $score,
                ':tempoJogo' => $tempoJogo,
                ':faseAtual' => $faseAtual,
                ':lixoReciclado' => $lixoColetado,
                ':cartasJogadas' => $cartasJogadas,
                ':session_token' => $sessionToken
            ]);
            
            $idPartida = $this->pdo->lastInsertId();
            
            // ✅ ATUALIZAR ESTATÍSTICAS DO USUÁRIO
            $this->atualizarStatsUsuario($resultado);
            
            // ✅ PROCESSAR CONQUISTAS
            $conquistasNovas = AchievementService::processar(
                $this->userId,
                $resultado,
                [
                    'resultado' => $resultado,
                    'score' => $score,
                    'lixo_coletado' => $lixoColetado,
                    'cartas_jogadas' => $cartasJogadas,
                    'tempo_jogo' => $tempoJogo
                ]
            );
            
            // ✅ LOG DE AUDITORIA
            $this->log('partida_registrada', [
                'idPartida' => $idPartida,
                'resultado' => $resultado,
                'score' => $score,
                'conquistas' => count($conquistasNovas)
            ]);
            
            // ✅ COMMIT
            $this->pdo->commit();
            
            return [
                'idPartida' => $idPartida,
                'sessionToken' => $sessionToken,
                'conquistasNovas' => $conquistasNovas,
                'mensagem' => 'Partida registrada com sucesso'
            ];
            
        } catch (Exception $e) {
            $this->pdo->rollBack();
            $this->log('erro_partida', ['erro' => $e->getMessage()]);
            throw $e;
        }
    }
    
    /**
     * Validação centralizada de payload
     * 
     * @param array $dados Dados a validar
     * @throws Exception Se validação falhar
     */
    private function validarPayload(array $dados): void {
        $campos_obrigatorios = ['resultado', 'score', 'tempo_jogo'];
        
        foreach ($campos_obrigatorios as $campo) {
            if (!isset($dados[$campo]) || $dados[$campo] === '') {
                throw new Exception("Campo obrigatório ausente: $campo", 400);
            }
        }
        
        // Validação de tipos
        if (!is_numeric($dados['score'])) {
            throw new Exception('Score deve ser numérico', 400);
        }
        
        if (!is_numeric($dados['tempo_jogo'])) {
            throw new Exception('Tempo de jogo deve ser numérico', 400);
        }
    }
    
    /**
     * Buscar partida por session token (para idempotência)
     * 
     * @param string $token Session token único
     * @return array|null Dados da partida ou null
     */
    private function obterPorSessionToken(string $token): ?array {
        $stmt = $this->pdo->prepare("
            SELECT idPartida, resultado, pontuacao, dataCriacao
            FROM partidas
            WHERE session_token = ? AND idUsuario = ?
            LIMIT 1
        ");
        $stmt->execute([$token, $this->userId]);
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
    }
    
    /**
     * Atualizar estatísticas globais do usuário
     * 
     * @param string $resultado 'vitoria' ou 'derrota'
     */
    private function atualizarStatsUsuario(string $resultado): void {
        $campoUpdate = $resultado === 'vitoria'
            ? 'totalVitorias = totalVitorias + 1'
            : 'totalDerrotas = totalDerrotas + 1';
        
        $stmt = $this->pdo->prepare("
            UPDATE usuarios SET
                totalPartidas = totalPartidas + 1,
                $campoUpdate,
                ultimoAcesso = NOW()
            WHERE idUsuario = ?
        ");
        
        $stmt->execute([$this->userId]);
    }
    
    /**
     * Log de auditoria
     * 
     * @param string $evento Tipo de evento
     * @param array $detalhes Dados adicionais
     */
    private function log(string $evento, array $detalhes = []): void {
        try {
            $stmt = $this->pdo->prepare("
                INSERT INTO log_autenticacao (idUsuario, tipoEvento, detalhes, dataCriacao)
                VALUES (?, ?, ?, NOW())
            ");
            
            $stmt->execute([
                $this->userId,
                $evento,
                json_encode($detalhes)
            ]);
        } catch (Exception $e) {
            // Silenciar erro de log
        }
    }
}

?>
