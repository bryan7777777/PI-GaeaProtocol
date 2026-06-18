<?php
/**
 * ============================================================
 * CONEXÃO REUTILIZÁVEL - PDO MySQL
 * ============================================================
 * 
 * Arquivo: /php/config/db.php
 * Descrição: Gerencia a conexão única com o banco de dados
 *            via PDO. Deve ser incluído em todos os PHPs:
 *            require_once __DIR__ . '/../config/db.php';
 *            
 *            Fornece a variável global $pdo para uso.
 * 
 * Autor: GitHub Copilot
 * Data: 2026-04-13
 * Versão: 1.0.0
 * 
 * ============================================================
 */

// Incluir configurações antes de conectar
require_once __DIR__ . '/config.php';

// ============================================================
// 1. INICIALIZAR CONEXÃO PDO
// ============================================================

try {
    // Montar string de conexão DSN
    $dsn = sprintf(
        "mysql:host=%s;dbname=%s;charset=%s",
        DB_HOST,
        DB_NAME,
        DB_CHARSET
    );

    // Criar conexão PDO com opções seguras
    $pdo = new PDO($dsn, DB_USER, DB_PASS, PDO_OPTIONS);

    // Log de sucesso em desenvolvimento
    if (!IS_PRODUCTION) {
        error_log('[DB] ✓ Conexão PDO estabelecida com sucesso');
    }

} catch (PDOException $e) {
    // Em produção, não expor mensagem de erro
    if (IS_PRODUCTION) {
        error_log('[DB] ✗ Erro de conexão: ' . $e->getMessage());
        header('Content-Type: application/json; charset=utf-8');
        http_response_code(500);
        echo json_encode([
            'status' => API_RESPONSE_STATUS_ERROR,
            'mensagem' => 'Erro de conexão com o banco de dados',
            'dados' => null
        ], JSON_UNESCAPED_UNICODE);
        exit();
    } else {
        // Em desenvolvimento, mostrar erro completo
        error_log('[DB] ✗ Erro PDOException: ' . $e->getMessage());
        die('Erro de conexão PDO: ' . htmlspecialchars($e->getMessage()));
    }
}

// ============================================================
// 2. FUNÇÕES AUXILIARES DE BANCO
// ============================================================

/**
 * Função auxiliar para log de queries (apenas em desenvolvimento)
 * 
 * @param string $query SQL preparada
 * @param array $params Parâmetros vinculados
 * @param mixed $result Resultado (opcional)
 * @return void
 */
function log_query($query, $params = [], $result = null) {
    if (!IS_PRODUCTION && LOG_LEVEL === 'debug') {
        $msg = sprintf(
            "[DB QUERY] %s | Params: %s | Result: %s",
            substr($query, 0, 100),
            json_encode($params),
            $result !== null ? 'OK' : 'PENDING'
        );
        error_log($msg);
    }
}

/**
 * Função auxiliar para executar query e retornar statement
 * Já vincula parâmetros e executa a query
 * 
 * @param PDO $pdo Objeto PDO
 * @param string $query SQL com placeholders :param
 * @param array $params Array de parâmetros
 * @return PDOStatement Statement executado
 * @throws Exception Se falhar
 */
function execute_query($pdo, $query, $params = []) {
    try {
        $stmt = $pdo->prepare($query);
        $stmt->execute($params);
        log_query($query, $params, true);
        return $stmt;
    } catch (PDOException $e) {
        error_log("[DB ERROR] Query: $query | Params: " . json_encode($params) . " | Error: " . $e->getMessage());
        throw $e;
    }
}

// ============================================================
// 3. FUNÇÕES DE AUDITORIA
// ============================================================

/**
 * Registra ação de auditoria
 * Útil para rastrear alterações sensíveis
 * 
 * @param int $userId ID do usuário (0 se não autenticado)
 * @param string $action Descrição da ação
 * @param string $ip IP do cliente
 * @param string $details Detalhes adicionais (JSON)
 * @return bool True se registrou com sucesso
 */
function audit_log($userId, $action, $ip, $details = null) {
    global $pdo;
    
    try {
        $query = "INSERT INTO audit_log (user_id, acao, ip, detalhes, data_hora) 
                  VALUES (:user_id, :acao, :ip, :detalhes, NOW())";
        
        $stmt = $pdo->prepare($query);
        $stmt->execute([
            ':user_id' => $userId ?: 0,
            ':acao' => $action,
            ':ip' => $ip,
            ':detalhes' => $details
        ]);
        
        return true;
    } catch (Exception $e) {
        error_log('[AUDIT] Erro ao registrar auditoria: ' . $e->getMessage());
        return false;
    }
}

// ============================================================
// FIM DO ARQUIVO DE CONEXÃO
// ============================================================
?>
