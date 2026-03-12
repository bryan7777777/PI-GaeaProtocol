<?php
/**
 * API de verificação de autenticação
 * Retorna dados JSON do usuário autenticado ou status de visitante
 * 
 * Resposta:
 * {
 *   "authenticated": true/false,
 *   "user": { id, nome, email, avatar, nivelAcesso }
 * }
 */

require_once '../config.php';
start_secure_session();

header('Content-Type: application/json');

// Verifica se o usuário está autenticado
if (!empty($_SESSION['user'])) {
    echo json_encode([
        'authenticated' => true,
        'user' => [
            'id' => $_SESSION['user']['id'],
            'nome' => $_SESSION['user']['nome'],
            'nomeUsuario' => $_SESSION['user']['nome'],
            'email' => $_SESSION['user']['email'],
            'avatar' => $_SESSION['user']['fotoPerfil'] ?? null,
            'nivelAcesso' => $_SESSION['user']['nivelAcesso'] ?? 'usuario'
        ]
    ]);
} else {
    echo json_encode([
        'authenticated' => false,
        'user' => null
    ]);
}
exit;
