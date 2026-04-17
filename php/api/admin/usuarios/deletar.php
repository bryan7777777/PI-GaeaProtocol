<?php
/**
 * ============================================================================
 * DELETAR USUÁRIO - Admin Only
 * ============================================================================
 * 
 * Endpoint: POST /php/api/admin/usuarios/deletar.php
 * 
 * JSON Body:
 * {
 *   "idUsuario": 1
 * }
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

$idUsuario = intval($input['idUsuario'] ?? 0);

if ($idUsuario <= 0) {
    responder_erro('ID inválido');
    exit;
}

// Proteção: não permitir deletar admin próprio
if ($idUsuario == $usuario['idUsuario']) {
    responder_erro('Você não pode deletar sua própria conta');
    exit;
}

try {
    // Começar transação
    $pdo->beginTransaction();
    
    // Deletar usuário (cascade delete deve fazer o resto)
    $stmt = $pdo->prepare("DELETE FROM usuarios WHERE idUsuario = ?");
    $stmt->execute([$idUsuario]);
    
    if ($stmt->rowCount() === 0) {
        $pdo->rollBack();
        responder_erro('Usuário não encontrado');
        exit;
    }
    
    $pdo->commit();
    
    // Log de auditoria
    log_autenticacao_evento($usuario['idUsuario'], 'admin_action', 
        "Deletado usuário ID: {$idUsuario}");
    
    responder_ok([
        'idUsuarioDeletado' => $idUsuario
    ], 'Usuário deletado com sucesso');
    
} catch (Exception $e) {
    $pdo->rollBack();
    responder_erro('Erro ao deletar usuário: ' . $e->getMessage());
}

?>
