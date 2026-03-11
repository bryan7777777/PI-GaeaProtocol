<?php

// Inicia a sessão segura
//start_secure_session();

session_start();
// Remove todas as variáveis da sessão
//session_unset();

$_SESSION = [];

if (isset($_COOKIE[session_name()])) {
setcookie(session_name(), '', time() - 3600, '/');
}

// Destrói completamente a sessão do usuário
session_destroy();

// Redireciona o usuário para a página de login
header("Location: ../login.php");

// Encerra o script para garantir o redirecionamento
exit;
?>