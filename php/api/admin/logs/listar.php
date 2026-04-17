<?php
/**
 * ============================================================================
 * LISTAR LOGS DE AUTENTICAÇÃO - Admin Only
 * ============================================================================
 * 
 * Endpoint: GET /php/api/admin/logs/listar.php
 * Query params: page, limit, tipoEvento, data
 * 
 * ============================================================================
 */

header('Content-Type: application/json');

require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    responder_metodo_nao_permitido();
    exit;
}
$usuario = verificar_admin();

$page = max(1, intval($_GET['page'] ?? 1));
$limit = min(100, intval($_GET['limit'] ?? 50));
$offset = ($page - 1) * $limit;
$tipoEvento = $_GET['tipoEvento'] ?? '';
$data = $_GET['data'] ?? '';

try {
    $query = "
        SELECT 
            l.idLogAutenticacao,
            l.idUsuario,
            u.nomeUsuario,
            l.tipoEvento,
            l.dataHoraEvento,
            l.enderecoIPCliente,
            l.mensagemEvento
        FROM log_autenticacao l
        LEFT JOIN usuarios u ON l.idUsuario = u.idUsuario
        WHERE 1=1
    ";
    
    $params = [];
    
    if ($tipoEvento) {
        $query .= " AND l.tipoEvento = ?";
        $params[] = $tipoEvento;
    }
    
    if ($data) {
        $query .= " AND DATE(l.dataHoraEvento) = ?";
        $params[] = $data;
    }
    
    // Contar total
    $countStmt = $pdo->query("SELECT COUNT(*) as total FROM log_autenticacao WHERE 1=1");
    $total = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];
    
    $query .= " ORDER BY l.dataHoraEvento DESC LIMIT ? OFFSET ?";
    $params[] = $limit;
    $params[] = $offset;
    
    $stmt = $pdo->prepare($query);
    $stmt->execute($params);
    $logs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    responder_ok('Logs carregados', [
        'logs' => $logs,
        'total' => $total,
        'pagina' => $page,
        'porPagina' => $limit
    ], $total);
    
    
} catch (Exception $e) {
    responder_erro('Erro: ' . $e->getMessage());
}

?>
