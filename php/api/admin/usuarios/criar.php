<?php
/**
 * ============================================================================
 * CRIAR NOVO USUÁRIO - Admin Only
 * ============================================================================
 * 
 * Endpoint: POST /php/api/admin/usuarios/criar.php
 * 
 * JSON Body:
 * {
 *   "nomeUsuario": "Novo Usuário",
 *   "emailUsuario": "novo@email.com",
 *   "senhaHash": "senha ou hash",
 *   "tipoUsuario": "admin|jogador"
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
$nomeUsuario = trim($input['nomeUsuario'] ?? '');
$emailUsuario = trim($input['emailUsuario'] ?? '');
$senha = trim($input['senhaHash'] ?? '');
$tipoUsuario = $input['tipoUsuario'] ?? 'jogador';

if (strlen($nomeUsuario) < 3) {
    responder_erro('Nome deve ter pelo menos 3 caracteres');
    exit;
}

if (!filter_var($emailUsuario, FILTER_VALIDATE_EMAIL)) {
    responder_erro('Email inválido');
    exit;
}

if (strlen($senha) < 6) {
    responder_erro('Senha deve ter pelo menos 6 caracteres');
    exit;
}

if (!in_array($tipoUsuario, ['admin', 'jogador'])) {
    responder_erro('Tipo de usuário inválido');
    exit;
}

try {
    // Verificar se email já existe
    $stmt = $pdo->prepare("SELECT idUsuario FROM usuarios WHERE emailUsuario = ?");
    $stmt->execute([$emailUsuario]);
    
    if ($stmt->rowCount() > 0) {
        responder_conflito('Email já está em uso');
        exit;
    }
    
    // Hash da senha
    $senhaHash = password_hash($senha, PASSWORD_BCRYPT);
    
    // Inserir usuário
    $query = "
        INSERT INTO usuarios (nomeUsuario, emailUsuario, senhaHash, tipoUsuario, usuarioAtivo)
        VALUES (?, ?, ?, ?, 1)
    ";
    
    $stmt = $pdo->prepare($query);
    $stmt->execute([
        $nomeUsuario,
        $emailUsuario,
        $senhaHash,
        $tipoUsuario
    ]);
    
    $idNovoUsuario = $pdo->lastInsertId();
    
    // Log de auditoria
    log_autenticacao_evento($usuario['idUsuario'], 'admin_action', 
        "Criado novo usuário ID: {$idNovoUsuario}");
    
    responder_ok([
        'idUsuario' => $idNovoUsuario,
        'nomeUsuario' => $nomeUsuario,
        'emailUsuario' => $emailUsuario,
        'tipoUsuario' => $tipoUsuario
    ], 'Usuário criado com sucesso', HTTP_CREATED);
    
} catch (Exception $e) {
    responder_erro('Erro ao criar usuário: ' . $e->getMessage());
}

?>
