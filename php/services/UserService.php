<?php
/**
 * ============================================================
 * UserService - Gerenciamento de Usuários
 * ============================================================
 * IMPLEMENTADO: Arquitetura_Proposta.md → Separação de Responsabilidades
 * 
 * Responsabilidades:
 * - Criar, atualizar, deletar usuários
 * - Obter dados do usuário
 * - Validar dados de perfil
 * - Log de auditoria
 * 
 * ============================================================
 */

class UserService {
    private $pdo;
    
    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
    }
    
    /**
     * Obter dados completos do usuário
     * 
     * @param int $userId ID do usuário
     * @return array Dados do usuário
     * @throws Exception Se usuário não encontrado
     */
    public function obter(int $userId): array {
        $stmt = $this->pdo->prepare("
            SELECT *
            FROM usuarios
            WHERE idUsuario = ?
            LIMIT 1
        ");
        
        $stmt->execute([$userId]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$user) {
            throw new Exception('Usuário não encontrado', 404);
        }
        
        return $user;
    }
    
    /**
     * Obter estatísticas do usuário
     * 
     * @param int $userId ID do usuário
     * @return array Estatísticas (vitorias, derrotas, pontuação, etc)
     */
    public function obterStats(int $userId): array {
        $stmt = $this->pdo->prepare("
            SELECT
                idUsuario,
                nomeUsuario,
                Avatar,
                nivelJogador,
                pontuacaoTotal,
                totalPartidas,
                totalVitorias,
                totalDerrotas,
                ROUND(totalVitorias / GREATEST(totalPartidas, 1) * 100, 2) as taxaVitoria,
                ultimoAcesso
            FROM usuarios
            WHERE idUsuario = ?
        ");
        
        $stmt->execute([$userId]);
        $stats = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$stats) {
            throw new Exception('Usuário não encontrado', 404);
        }
        
        return $stats;
    }
    
    /**
     * Atualizar perfil do usuário
     * 
     * @param int $userId ID do usuário
     * @param array $dados Campos a atualizar (nomeUsuario, Avatar, etc)
     * @return array Dados atualizados
     */
    public function atualizar(int $userId, array $dados): array {
        // Validar dados
        $this->validarPerfilUpdate($dados);
        
        $campos = [];
        $valores = [];
        
        // Apenas campos permitidos
        $permitidos = ['nomeUsuario', 'Avatar', 'nivelJogador'];
        foreach ($permitidos as $campo) {
            if (isset($dados[$campo])) {
                $campos[] = "$campo = ?";
                $valores[] = $dados[$campo];
            }
        }
        
        if (empty($campos)) {
            throw new Exception('Nenhum campo para atualizar', 400);
        }
        
        $valores[] = $userId;
        
        $sql = "UPDATE usuarios SET " . implode(', ', $campos) . " WHERE idUsuario = ?";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($valores);
        
        return $this->obter($userId);
    }
    
    /**
     * Validar dados de perfil
     * 
     * @param array $dados Dados a validar
     * @throws Exception Se inválido
     */
    private function validarPerfilUpdate(array $dados): void {
        if (isset($dados['nomeUsuario'])) {
            if (strlen($dados['nomeUsuario']) < 3) {
                throw new Exception('Nome deve ter pelo menos 3 caracteres', 400);
            }
            if (strlen($dados['nomeUsuario']) > 50) {
                throw new Exception('Nome não pode exceder 50 caracteres', 400);
            }
        }
        
        if (isset($dados['nivelJogador'])) {
            if (!is_numeric($dados['nivelJogador']) || $dados['nivelJogador'] < 0) {
                throw new Exception('Nível deve ser um número positivo', 400);
            }
        }
    }
}

?>
