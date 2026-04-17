<?php
/**
 * ============================================================
 * CONFIGURAÇÕES CENTRALIZADAS - GAEA PROTOCOL
 * ============================================================
 * 
 * Arquivo: /php/config/config.php
 * Descrição: Arquivo central que consolida todas as constantes
 *            de configuração do projeto (banco, API, segurança).
 *            Deve ser incluído em todos os PHPs via:
 *            require_once __DIR__ . '/../config/config.php';
 * 
 * Autor: GitHub Copilot
 * Data: 2026-04-13
 * Versão: 1.0.0
 * 
 * ============================================================
 */

// ============================================================
// 1. BANCO DE DADOS - Configurações
// ============================================================

// Carregar variáveis de ambiente ou usar defaults
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DB_NAME') ?: 'gaea');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') ?: '');
define('DB_CHARSET', 'utf8mb4');

// Configurações de conexão PDO
define('PDO_OPTIONS', [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_STRINGIFY_FETCHES => false,
]);

// ============================================================
// 2. SEGURANÇA - Variáveis de Sessão
// ============================================================

// Cookies HTTP-only (não acessível via JavaScript)
define('SESSION_COOKIE_HTTPONLY', true);

// Usar apenas cookies (sem URL rewriting)
define('SESSION_USE_ONLY_COOKIES', true);

// Tempo de vida da sessão (em segundos) - 1 hora
define('SESSION_LIFETIME', 3600);

// ============================================================
// 3. DETECÇÃO DE AMBIENTE
// ============================================================

$isProduction = !in_array($_SERVER['SERVER_NAME'] ?? 'localhost', [
    'localhost',
    '127.0.0.1',
    '::1'
]);

$isSecure = $isProduction && (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');

define('IS_PRODUCTION', $isProduction);
define('IS_SECURE', $isSecure);

// ============================================================
// 4. API - Padrão de Respostas
// ============================================================

// Código HTTP padrão para sucesso
define('HTTP_OK', 200);
define('HTTP_CREATED', 201);

// Código HTTP padrão para erros
define('HTTP_BAD_REQUEST', 400);
define('HTTP_UNAUTHORIZED', 401);
define('HTTP_FORBIDDEN', 403);
define('HTTP_NOT_FOUND', 404);
define('HTTP_METHOD_NOT_ALLOWED', 405);
define('HTTP_CONFLICT', 409);
define('HTTP_INTERNAL_SERVER_ERROR', 500);

// Formato padrão de resposta JSON: {"status":"ok"|"erro", "dados":{...}, "mensagem":"..."}
define('API_RESPONSE_STATUS_OK', 'ok');
define('API_RESPONSE_STATUS_ERROR', 'erro');

// ============================================================
// 5. VALIDAÇÃO - Limites e Regras
// ============================================================

// Limite de tentativas de login
define('MAX_LOGIN_ATTEMPTS', 5);

// Tempo de bloqueio após exceder tentativas (em segundos)
define('LOGIN_LOCKOUT_TIME', 900); // 15 minutos

// Tamanho máximo de upload de avatar (em bytes) - 5MB
define('MAX_AVATAR_SIZE', 5242880);

// Extensões de arquivo permitidas para avatar
define('ALLOWED_AVATAR_EXTENSIONS', ['jpg', 'jpeg', 'png', 'gif', 'webp']);

// ID mínimo e máximo de conquista
define('MIN_ACHIEVEMENT_ID', 1);
define('MAX_ACHIEVEMENT_ID', 27);

// ============================================================
// 6. PATHS - Diretórios e URLs
// ============================================================

// Diretório raiz do projeto (relativo ao script atual)
define('PROJECT_ROOT', realpath(__DIR__ . '/../../'));

// Diretórios de upload
define('UPLOAD_DIR', PROJECT_ROOT . '/uploads');
define('AVATAR_UPLOAD_DIR', UPLOAD_DIR . '/avatars');

// URL base da aplicação
define('BASE_URL', 'http' . (IS_SECURE ? 's' : '') . '://' . (@$_SERVER['HTTP_HOST'] ?: 'localhost'));

// URL da API
define('API_BASE_URL', BASE_URL . '/php/api');

// ============================================================
// 7. LOGGING - Configurações
// ============================================================

// Arquivo de log de erros
define('ERROR_LOG_FILE', PROJECT_ROOT . '/php/logs/error.log');

// Arquivo de log de email
define('EMAIL_LOG_FILE', PROJECT_ROOT . '/php/logs/email.log');

// Arquivo de log de auditoria (api calls, etc)
define('AUDIT_LOG_FILE', PROJECT_ROOT . '/php/logs/audit.log');

// Nível de logging: 'debug', 'info', 'warning', 'error'
define('LOG_LEVEL', IS_PRODUCTION ? 'warning' : 'debug');

// ============================================================
// 8. CORS - Configurações (se necessário)
// ============================================================

// Origens permitidas para CORS
define('ALLOWED_ORIGINS', [
    'http://localhost:8000',
    'http://localhost:3000',
    'http://127.0.0.1:8000',
    'https://gaea-protocol.com', // Produção (exemplo)
]);

// Métodos HTTP permitidos
define('ALLOWED_METHODS', ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']);

// Headers permitidos
define('ALLOWED_HEADERS', ['Content-Type', 'Authorization', 'X-Requested-With']);

// ============================================================
// 9. CONFIGURAÇÕES DE EMAIL (se necessário)
// ============================================================

define('MAIL_FROM', getenv('MAIL_FROM') ?: 'noreply@gaea-protocol.local');
define('MAIL_FROM_NAME', 'Gaea Protocol');

// SMTP (se usar)
define('SMTP_HOST', getenv('SMTP_HOST') ?: 'localhost');
define('SMTP_PORT', getenv('SMTP_PORT') ?: 587);
define('SMTP_USER', getenv('SMTP_USER') ?: '');
define('SMTP_PASS', getenv('SMTP_PASS') ?: '');

// ============================================================
// 10. APLICAR CONFIGURAÇÕES DE SEGURANÇA (ANTES DO SESSION_START)
// ============================================================

// NOTA: Essas configurações devem ser aplicadas ANTES que a sessão seja iniciada
// Se session_status() === PHP_SESSION_NONE, significan que a sessão ainda não foi iniciada
if (session_status() === PHP_SESSION_NONE) {
    // Configurar cookies de sessão conforme ambiente
    if (SESSION_COOKIE_HTTPONLY) {
        ini_set('session.cookie_httponly', 1);
    }

    if (SESSION_USE_ONLY_COOKIES) {
        ini_set('session.use_only_cookies', 1);
    }

    // Se em HTTPS, forçar secure flag nos cookies
    if (IS_SECURE) {
        ini_set('session.cookie_secure', 1);
        ini_set('session.cookie_samesite', 'Strict');
    } else {
        // Em desenvolvimento, permitir SameSite Lax
        ini_set('session.cookie_samesite', 'Lax');
    }

    // Tempo de vida da sessão
    ini_set('session.gc_maxlifetime', SESSION_LIFETIME);
}

// ============================================================
// 11. HEADERS DE SEGURANÇA BÁSICOS
// ============================================================

header_remove('X-Powered-By');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

if (IS_SECURE) {
    header('Strict-Transport-Security: max-age=31536000; includeSubDomains');
}

// ============================================================
// 12. ERROR HANDLING
// ============================================================

// Em produção, não mostrar erros
if (IS_PRODUCTION) {
    error_reporting(E_ALL);
    ini_set('display_errors', '0');
    ini_set('log_errors', '1');
    ini_set('error_log', ERROR_LOG_FILE);
} else {
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
}

// ============================================================
// FIM DO ARQUIVO DE CONFIGURAÇÃO
// ============================================================
?>
