<?php
require_once 'config.php';
start_secure_session();

$token = $_GET['token'] ?? '';

if (!$token || !ctype_xdigit($token)) {
    die('Token inválido.');
}

$tokenHash = hash('sha256', $token);

$stmt = $pdo->prepare("
    SELECT pr.*, u.email 
    FROM password_resets pr
    JOIN user u ON u.idUser = pr.idUser
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
        UPDATE user 
        SET senha = ? 
        WHERE idUser = ?
    ")->execute([$novaHash, $reset['idUser']]);

    // Invalida sessões
    $pdo->prepare("
        DELETE FROM password_resets WHERE idUser = ?
    ")->execute([$reset['idUser']]);

    // Remove token
    $pdo->prepare("
        DELETE FROM password_resets WHERE idReset = ?
    ")->execute([$reset['idReset']]);

    echo "Senha alterada com sucesso.";
}

// depois do processamento, mostrar formulário ou mensagem
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redefinir Senha - Gaea Protocol</title>
    <link rel="stylesheet" href="../css/reset.css">
    <link rel="stylesheet" href="../css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Megrim&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="../js/script.js" defer></script>
</head>
<body>
    <!-- Background animations -->
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
            <h1><i class="fas fa-key"></i> Nova Senha</h1>
            <!-- form contents will be inserted by PHP at runtime if needed -->
        </div>
    </div>
</body>
</html>