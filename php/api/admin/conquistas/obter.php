<?php
/**
 * ============================================================================
 * OBTER CONQUISTA - Admin Only
 * ============================================================================
 * 
 * Endpoint: GET /php/api/admin/conquistas/obter.php?id=1
 * 
 * ============================================================================
 */

header('Content-Type: application/json');

require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/auth.php';

$usuario = verificar_admin();
$idConquista = intval($_GET['id'] ?? 0);

if ($idConquista <= 0) {
    responder_erro('ID inválido');
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT * FROM conquistas WHERE idConquista = ?
    ");
    $stmt->execute([$idConquista]);
    $conquista = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$conquista) {
        responder_erro('Conquista não encontrada');
        exit;
    }
    
    responder_ok($conquista, 'Conquista carregada');
    
} catch (Exception $e) {
    responder_erro('Erro: ' . $e->getMessage());
}

?>
