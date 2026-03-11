<?php
require_once '../config.php';
start_secure_session();

if (empty($_SESSION['user'])) {
    header("Location: ../login.php");
    exit;
}

$usuario = $_SESSION['user']['nome'];
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Dashboard</title>
<link rel="stylesheet" href="style.css">
</head>

<body>

<h1>Bem-vindo, <?php echo $usuario; ?>!</h1>

<p>Você está logado no sistema.</p>

<a href="logout.php">Sair</a>

</body>
</html>