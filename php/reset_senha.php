<?php
require_once 'config.php';
start_secure_session();

$token = $_GET['token'] ?? '';

if (!$token || !ctype_xdigit($token)) {
    die('Token inválido.');
}

$tokenHash = hash('sha256', $token);

$stmt = $pdo->prepare("
    SELECT pr.*, u.emailUsuario 
    FROM password_resets pr
    JOIN usuario u ON u.idUsuario = pr.idUsuario
    WHERE pr.tokenHash = ?
");
$stmt->execute([$tokenHash]);
$reset = $stmt->fetch();

if (!$reset) {
    die('Token inválido.');
}

if (strtotime($reset['expires_at']) < time()) {
    die('Token expirado.');
}

if ($reset['tentativas'] >= 5) {
    die('Muitas tentativas. Solicite novo código.');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (!validate_csrf_token($_POST['csrf_token'] ?? '')) {
        die('Erro de segurança.');
    }

    $codigo = preg_replace('/[^0-9]/', '', $_POST['codigo']);
    $senha = $_POST['senha'] ?? '';
    $confirm = $_POST['confirmar_senha'] ?? '';

    if (strlen($codigo) !== 6) {
        die('Código inválido.');
    }

    if (!hash_equals($reset['codigo'], $codigo)) {

        $pdo->prepare("
            UPDATE password_resets 
            SET tentativas = tentativas + 1 
            WHERE idReset = ?
        ")->execute([$reset['idReset']]);

        die('Código incorreto.');
    }

    if (strlen($senha) < 8 || $senha !== $confirm) {
        die('Senha inválida.');
    }

    $novaHash = password_hash($senha, PASSWORD_BCRYPT, ['cost' => 12]);

    $pdo->prepare("
        UPDATE usuario 
        SET senhaHash = ? 
        WHERE idUsuario = ?
    ")->execute([$novaHash, $reset['idUsuario']]);

    // Invalida sessões
    $pdo->prepare("
        DELETE FROM sessaoUsuario WHERE idUsuario = ?
    ")->execute([$reset['idUsuario']]);

    // Remove token
    $pdo->prepare("
        DELETE FROM password_resets WHERE idReset = ?
    ")->execute([$reset['idReset']]);

    echo "Senha alterada com sucesso.";
}