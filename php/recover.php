<?php
require_once 'config.php';
start_secure_session();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (!validate_csrf_token($_POST['csrf_token'] ?? '')) {
        die('Erro de segurança.');
    }

    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die('Email inválido.');
    }

    $stmt = $pdo->prepare("SELECT idUsuario FROM usuario WHERE emailUsuario = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    // Sempre responder igual (evita enumeração)
    $responseMessage = "Se o email existir, instruções foram enviadas.";

    if ($user) {

        // Remove tokens antigos
        $pdo->prepare("DELETE FROM password_resets WHERE idUsuario = ?")
            ->execute([$user['idUsuario']]);

        $token = bin2hex(random_bytes(32));
        $tokenHash = hash('sha256', $token);

        $codigo = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        $expires = date('Y-m-d H:i:s', strtotime('+20 minutes'));

        $stmt = $pdo->prepare("
            INSERT INTO password_resets 
            (idUsuario, tokenHash, codigo, expires_at, created_at)
            VALUES (?, ?, ?, ?, NOW())
        ");

        $stmt->execute([
            $user['idUsuario'],
            $tokenHash,
            $codigo,
            $expires
        ]);

        $link = "https://seudominio.com/reset_senha.php?token=$token";

        send_recovery_email_api($email, $codigo, $link);
    }

    echo $responseMessage;
}