<?php
/**
 * ============================================================================
 * LISTAR PARTIDAS - Admin Only
 * ============================================================================
 * 
 * Endpoint: GET /php/api/admin/partidas/listar.php
 * Query params: page, limit, idUsuario, resultado
 * 
 * ============================================================================
 */

header('Content-Type: application/json');

require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/auth.php';

// CORRIGIDO: Validar que apenas GET é permitido
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    responder_metodo_nao_permitido();
    exit;
}

$usuario = verificar_admin();

$page = max(1, intval($_GET['page'] ?? 1));
$limit = min(100, intval($_GET['limit'] ?? 50));
$offset = ($page - 1) * $limit;
$idUsuario = intval($_GET['idUsuario'] ?? 0);
$resultado = $_GET['resultado'] ?? '';

try {
    $query = "
        SELECT 
            p.idPartida,
            p.idUsuario,
            u.nomeUsuario,
            p.resultadoPartida,
            p.pontuacaoPartida,
            p.duracaoSegundos,
            p.dataHoraPartida,
            ep.cartasJogadas,
            ep.lixoReciclado,
            ep.danoTotal
        FROM partidas p
        LEFT JOIN usuarios u ON p.idUsuario = u.idUsuario
        LEFT JOIN estatisticas_partida ep ON p.idPartida = ep.idPartida
        WHERE 1=1
    ";
    
    $params = [];
    
    if ($idUsuario > 0) {
        $query .= " AND p.idUsuario = ?";
        $params[] = $idUsuario;
    }
    
    if ($resultado && in_array($resultado, ['Vitoria', 'Derrota'])) {
        $query .= " AND p.resultadoPartida = ?";
        $params[] = $resultado;
    }
    
    // Contar total
    $countQuery = "SELECT COUNT(*) as total FROM partidas p WHERE 1=1";
    if ($idUsuario > 0) $countQuery .= " AND p.idUsuario = " . intval($idUsuario);
    if ($resultado) $countQuery .= " AND p.resultadoPartida = '" . $resultado . "'";
    
    $countStmt = $pdo->query($countQuery);
    $total = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];
    
    $query .= " ORDER BY p.dataHoraPartida DESC LIMIT ? OFFSET ?";
    $params[] = $limit;
    $params[] = $offset;
    
    $stmt = $pdo->prepare($query);
    $stmt->execute($params);
    $partidas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    responder_ok([
        'partidas' => $partidas,
        'total' => $total,
        'pagina' => $page,
        'porPagina' => $limit,
        'totalPaginas' => ceil($total / $limit)
    ], 'Partidas carregadas');
    
} catch (Exception $e) {
    responder_erro('Erro: ' . $e->getMessage());
}

?>
