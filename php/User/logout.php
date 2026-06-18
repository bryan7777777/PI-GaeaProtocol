<?php
/**
 * Script de Logout
 * Destrói a sessão do usuário com segurança
 */

require_once '../config.php';
start_secure_session();

// Log de logout
if (!empty($_SESSION['user'])) {
    $usuario_id = $_SESSION['user']['id'];
    error_log("Logout realizado: Usuário ID {$usuario_id}");
}

// Limpa todas as variáveis de sessão
$_SESSION = [];

// Delete o cookie de sessão
if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', time() - 3600, '/');
}

// Destrói completamente a sessão
session_destroy();

// Redireciona para login com mensagem
header("Location: ../login.php?logout=sucesso");
exit;


// Encerra o script para garantir o redirecionamento
exit;
?>