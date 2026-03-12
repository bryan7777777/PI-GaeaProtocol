<?php
/**
 * Script de autenticação
 * Processa login e cria sessão segura
 */

require_once 'config.php';
start_secure_session();

// Verifica se chegou via POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: login.php');
    exit;
}

// Valida CSRF token
if (!validate_csrf_token($_POST['csrf_token'] ?? '')) {
    header('Location: login.php?error=csrf');
    exit;
}

// Captura e valida dados
$email = strtolower(trim($_POST['email'] ?? ''));
$senha = $_POST['senha'] ?? '';

if (empty($email) || empty($senha) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: login.php?login=erro');
    exit;
}

try {
    // Busca usuário no banco
    $stmt = $pdo->prepare(
        "SELECT idUser, userName, email, senha 
         FROM user 
         WHERE email = ?
         LIMIT 1"
    );
    
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    // se a coluna senha estiver truncada a hash será menor que o esperado
    if ($user && strlen($user['senha']) < 60) {
        error_log("Hash truncado detectado para {$email}");
        header('Location: login.php?error=schema');
        exit;
    }

    // Verifica se encontrou usuário e se a senha está correta
    // Se o hash é o padrão da seed (igual para todos), redireciona para redefinir
    if ($user && ($user['senha'] === '$2y$12$8zqpTVMzN4eQqzH9Y0K2wODaVVVkVVVkVVVkVVVkVVVkVVVkVVVkV' || password_verify($senha, $user['senha']))) {
        // Se é hash padrão da seed, força redefinição
        if ($user['senha'] === '$2y$12$8zqpTVMzN4eQqzH9Y0K2wODaVVVkVVVkVVVkVVVkVVVkVVVkVVVkV') {
            error_log("Tentativa de login com senha padrão detectada para {$email}");
            header('Location: login.php?error=default_password');
            exit;
        }
        
        // Regenera ID de sessão para evitar roubo
        session_regenerate_id(true);

        // Cria array de sessão do usuário
        $_SESSION['user'] = [
            'id' => $user['idUser'],
            'nome' => $user['userName'],
            'email' => $user['email'],
            'nivelAcesso' => 'usuario',
            'last_activity' => time(),
            'ip' => $_SERVER['REMOTE_ADDR'],
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? ''
        ];

        // Log de sucesso
        error_log("Login bem-sucedido: {$email}");

        // Redireciona para novo dashboard
        header('Location: User/dashboard_new.php');
        exit;
    } else {
        // Log de falha
        error_log("Falha de login: {$email}");
        header('Location: login.php?login=erro');
        exit;
    }
} catch (PDOException $e) {
    error_log("Erro de banco de dados: " . $e->getMessage());
    header('Location: login.php?error=database');
    exit;
}
