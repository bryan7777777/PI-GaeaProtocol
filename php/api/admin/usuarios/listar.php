<?php
/**
 * ============================================================================
 * LISTAR USUÁRIOS - Admin Only
 * ============================================================================
 * 
 * Endpoint: GET /php/api/admin/usuarios/listar.php
 * 
 * Query params:
 * - page (int) - Página (default: 1)
 * - limit (int) - Itens por página (default: 50)
 * - search (string) - Buscar por nome/email
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

// Parâmetros
$page = max(1, intval($_GET['page'] ?? 1));
$limit = min(100, intval($_GET['limit'] ?? 50));
$offset = ($page - 1) * $limit;
$search = trim($_GET['search'] ?? '');

try {
    // Query base
    $query = "
        SELECT 
            idUsuario,
            nomeUsuario,
            emailUsuario,
            tipoUsuario,
            nivelJogador,
            pontuacaoTotal,
            totalPartidas,
            totalVitorias,
            totalDerrotas,
            dataCadastro,
            ultimoAcesso,
            usuarioAtivo
        FROM usuarios
        WHERE 1=1
    ";
    
    $params = [];
    
    // Filtro de busca
    if ($search) {
        $query .= " AND (nomeUsuario LIKE ? OR emailUsuario LIKE ?)";
        $params[] = "%{$search}%";
        $params[] = "%{$search}%";
    }
    
    // Contar total
    $countQuery = "SELECT COUNT(*) as total FROM usuarios WHERE 1=1";
    if ($search) {
        $countQuery .= " AND (nomeUsuario LIKE ? OR emailUsuario LIKE ?)";
    }
    $countStmt = $pdo->prepare($countQuery);
    $countStmt->execute($params);
    $total = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];
    
    // Aplicar limit
    $query .= " ORDER BY dataCadastro DESC LIMIT ? OFFSET ?";
    $params[] = $limit;
    $params[] = $offset;
    
    // Executar query
    $stmt = $pdo->prepare($query);
    $stmt->execute($params);
    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    responder_ok('Usuários carregados', [
        'usuarios' => $usuarios,
        'pagina' => $page,
        'porPagina' => $limit,
        'total' => $total,
        'totalPaginas' => ceil($total / $limit)
    ]);
    
} catch (Exception $e) {
    responder_erro('Erro ao carregar usuários: ' . $e->getMessage());
}

?>
