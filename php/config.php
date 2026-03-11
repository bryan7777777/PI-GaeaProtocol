<?php
// config.php

// Configurações do Banco de Dados
$host = getenv('DB_HOST') ?: 'localhost';
$db_name = getenv('DB_NAME') ?: 'test';
$db_user = getenv('DB_USER') ?: 'root';
$db_pass = getenv('DB_PASS') ?: ''; 

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    error_log('Erro BD: ' . $e->getMessage());
    die('Erro interno.');
}

/* 
   TABELA NECESSÁRIA (Execute no seu Banco de Dados):
   CREATE TABLE IF NOT EXISTS password_resets (
       email VARCHAR(255) NOT NULL,
       token VARCHAR(255) NOT NULL,
       expires_at DATETIME NOT NULL,
       INDEX (email)
   );
*/

// Segurança de Sessão
ini_set('session.cookie_httponly', 1);
ini_set('session.use_only_cookies', 1);

// Detectar ambiente
$isProduction = $_SERVER['SERVER_NAME'] !== 'localhost' && $_SERVER['SERVER_NAME'] !== '127.0.0.1' && !in_array($_SERVER['REMOTE_ADDR'], ['127.0.0.1', '::1']);
$isSecure = $isProduction && (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');

if ($isSecure) {
    ini_set('session.cookie_secure', 1); // HTTPS obrigatório em produção
}

function start_secure_session(): void {
    global $isProduction, $isSecure;
    
    if (session_status() === PHP_SESSION_NONE) {
        if (PHP_VERSION_ID >= 70300) {
            session_set_cookie_params([
                'lifetime' => 1800,
                'path' => '/',
                'secure' => $isSecure,
                'httponly' => true,
                'samesite' => $isProduction ? 'Strict' : 'Lax'
            ]);
        }
        session_start();
    }

    // Timeout de 30 minutos
    if (isset($_SESSION['user']) && (time() - $_SESSION['user']['last_activity'] > 1800)) {
        session_unset();
        session_destroy();
        header('Location: login.php?expired');
        exit;
    }
    if (isset($_SESSION['user'])) {
        $_SESSION['user']['last_activity'] = time();
    }
}

// Funções de Segurança
function csrf_token(): string {
    if (empty($_SESSION['csrf_token']) || isset($_SESSION['csrf_token_time']) && time() - $_SESSION['csrf_token_time'] > 3600) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        $_SESSION['csrf_token_time'] = time();
    }
    return $_SESSION['csrf_token'];
}

function validate_csrf_token(string $token): bool {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

function sanitize(string $s): string {
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

// SIMULAÇÃO DE API DE ENVIO DE EMAIL
// Em produção, use PHPMailer ou cURL para um serviço como SendGrid/Mailgun
function send_recovery_email_api(string $email, string $codigo): bool {
    $assunto = "Código de Recuperação - Gaea Protocol";
    $mensagem = "Seu código de recuperação é: " . $codigo;
    
    // Log para teste (verifique o log do servidor ou a pasta logs)
    error_log("--- [SIMULAÇÃO EMAIL API] ---\nPara: $email\nAssunto: $assunto\nMensagem: $mensagem\n---------------------------", 3, __DIR__ . '/email_log.txt');
    
    // Aqui entraria a lógica de API (Ex: Mailchimp, SendGrid)
    return true; 
}
?>