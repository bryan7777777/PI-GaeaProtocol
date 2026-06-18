<?php
/**
 * ============================================================================
 * ATUALIZAR USUÁRIO - Admin Only
 * ============================================================================
 * 
 * Endpoint: POST /php/api/admin/usuarios/atualizar.php
 * 
 * JSON Body:
 * {
 *   "idUsuario": 1,
 *   "nomeUsuario": "Novo Nome",
 *   "emailUsuario": "novo@email.com",
 *   "tipoUsuario": "admin|jogador",
 *   "usuarioAtivo": 1|0
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

// Validar entrada
$idUsuario = intval($input['idUsuario'] ?? 0);
$nomeUsuario = trim($input['nomeUsuario'] ?? '');
$emailUsuario = trim($input['emailUsuario'] ?? '');
$tipoUsuario = $input['tipoUsuario'] ?? 'jogador';
$usuarioAtivo = intval($input['usuarioAtivo'] ?? 1);

if ($idUsuario <= 0) {
    responder_erro('ID inválido');
    exit;
}

if (strlen($nomeUsuario) < 3) {
    responder_erro('Nome deve ter pelo menos 3 caracteres');
    exit;
}

if (!filter_var($emailUsuario, FILTER_VALIDATE_EMAIL)) {
    responder_erro('Email inválido');
    exit;
}

if (!in_array($tipoUsuario, ['admin', 'jogador'])) {
    responder_erro('Tipo de usuário inválido');
    exit;
}

try {
    // Verificar se email já existe (excluindo usuário atual)
    $stmt = $pdo->prepare("SELECT idUsuario FROM usuarios WHERE emailUsuario = ? AND idUsuario != ?");
    $stmt->execute([$emailUsuario, $idUsuario]);
    
    if ($stmt->rowCount() > 0) {
        responder_conflito('Email já está em uso');
        exit;
    }
    
    // Atualizar
    $query = "
        UPDATE usuarios
        SET 
            nomeUsuario = ?,
            emailUsuario = ?,
            tipoUsuario = ?,
            usuarioAtivo = ?
        WHERE idUsuario = ?
    ";
    
    $stmt = $pdo->prepare($query);
    $stmt->execute([
        $nomeUsuario,
        $emailUsuario,
        $tipoUsuario,
        $usuarioAtivo,
        $idUsuario
    ]);
    
    // Log de auditoria
    log_autenticacao_evento($usuario['idUsuario'], 'admin_action', 
        "Atualizado usuário ID: {$idUsuario}");
    
    responder_ok([
        'idUsuario' => $idUsuario,
        'nomeUsuario' => $nomeUsuario,
        'tipoUsuario' => $tipoUsuario
    ], 'Usuário atualizado com sucesso');
    
} catch (Exception $e) {
    responder_erro('Erro ao atualizar usuário: ' . $e->getMessage());
}

?>
