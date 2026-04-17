<?php
/**
 * ============================================================================
 * DELETAR CONQUISTA - Admin Only
 * ============================================================================
 * 
 * POST /php/api/admin/conquistas/deletar.php
 * JSON: { "idConquista": 1 }
 * 
 * ============================================================================
 */

header('Content-Type: application/json');

require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/auth.php';

validar_metodo_post();
$usuario = verificar_admin();
$input = ler_json_input();

$idConquista = intval($input['idConquista'] ?? 0);

if ($idConquista <= 0) {
    responder_erro('ID inválido');
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM conquistas WHERE idConquista = ?");
    $stmt->execute([$idConquista]);
    
    responder_ok([], 'Conquista deletada');
    
} catch (Exception $e) {
    responder_erro('Erro: ' . $e->getMessage());
}

?>
