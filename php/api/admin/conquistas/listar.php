<?php
/**
 * ============================================================================
 * LISTAR CONQUISTAS - Admin Only
 * ============================================================================
 * 
 * Endpoint: GET /php/api/admin/conquistas/listar.php
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

try {
    $query = "
        SELECT 
            idConquista,
            nomeConquista,
            descricaoConquista,
            nomPersonagemConquista,
            categoriaConquista,
            iconeConquista,
            pontosBonusConquista,
            (SELECT COUNT(*) FROM usuario_conquistas WHERE idConquista = conquistas.idConquista) as vezesDesbloqueadas
        FROM conquistas
        ORDER BY categoriaConquista, nomeConquista
    ";
    
    $stmt = $pdo->query($query);
    $conquistas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    responder_ok('Conquistas carregadas', $conquistas);
    
} catch (Exception $e) {
    responder_erro('Erro: ' . $e->getMessage());
}

?>
