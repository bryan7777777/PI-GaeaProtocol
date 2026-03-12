<?php
require_once 'config.php';
start_secure_session();

$responseMessage = '';
$showForm = true;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (!validate_csrf_token($_POST['csrf_token'] ?? '')) {
        die('Erro de segurança.');
    }

    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $responseMessage = 'Email inválido.';
    } else {
        $stmt = $pdo->prepare("SELECT idUser FROM user WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        // Sempre responder igual (evita enumeração)
        $responseMessage = "Se o email existir, instruções foram enviadas.";

        if ($user) {
            // Remove tokens antigos
            $pdo->prepare("DELETE FROM password_resets WHERE idUser = ?")
                ->execute([$user['idUser']]);

            $token = bin2hex(random_bytes(32));
            $tokenHash = hash('sha256', $token);

            $codigo = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

            $expires = date('Y-m-d H:i:s', strtotime('+20 minutes'));

            $stmt = $pdo->prepare(
                "INSERT INTO password_resets 
                (idUser, tokenHash, codigo, expires_at, created_at)
                VALUES (?, ?, ?, ?, NOW())"
            );

            $stmt->execute([
                $user['idUser'],
                $tokenHash,
                $codigo,
                $expires
            ]);

            $link = "https://seudominio.com/reset_senha.php?token=$token";
            send_recovery_email_api($email, $codigo, $link);
        }
    }

    $showForm = false;
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperar Senha - Gaea Protocol</title>
    <link rel="stylesheet" href="../css/reset.css">
    <link rel="stylesheet" href="../css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Megrim&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="../js/script.js" defer></script>
</head>
<body>
    <!-- background animations container -->
    <div class="background-system">
        <div class="background-base"></div>
        <div class="circuit-grid"></div>
        <div class="energy-lines" id="energyLinesContainer"></div>
        <div class="particles-container" id="particlesContainer"></div>
        <div class="scanner-effect"></div>
        <div class="distortion-layer"></div>
    </div>

    <nav class="top-nav">
        <div class="logo" onclick="window.location.href='../../index.html'" style="cursor: pointer;">GAEA PROTOCOL</div>
        <div class="links">
            <a href="../index.html">VOLTAR AO SITE</a>
            <a href="login.php">LOGIN</a>
        </div>
    </nav>

    <div class="form-container">
        <div class="form-box">
            <h1><i class="fas fa-envelope-open-text"></i> Recuperar Conta</h1>
            <?php if ($responseMessage): ?>
                <div class="success-msg"><?php echo sanitize($responseMessage); ?></div>
            <?php endif; ?>

            <?php if ($showForm): ?>
            <form method="POST">
                <input type="hidden" name="csrf_token" value="<?php echo csrf_token(); ?>">
                <div class="form-group">
                    <label for="email"><i class="fas fa-envelope"></i> Email</label>
                    <input type="email" id="email" name="email" placeholder="seu@email.com" required autocomplete="email">
                </div>
                <button type="submit" class="botao">Enviar Código</button>
            </form>
            <?php endif; ?>

            <div class="form-links">
                <a href="login.php" class="link"><i class="fas fa-lock"></i> Voltar ao login</a>
            </div>
        </div>
    </div>
</body>
</html>
