<?php
/**
 * ============================================================
 * ARQUIVO DE COMPATIBILIDADE - config.php LEGADO
 * ============================================================
 * 
 * Arquivo: /php/config.php
 * Descrição: Arquivo de compatibilidade que redireciona todas
 *            as inclusões legadas para a nova estrutura em
 *            /php/config/. Use este arquivo em código antigo.
 * 
 * ============================================================
 */

// Redirecionar para nova estrutura de configuração
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/config/db.php';
require_once __DIR__ . '/config/response.php';

// ============================================================
// FUNÇÕES AUXILIARES (COMPATIBILIDADE COM CÓDIGO LEGADO)
// ============================================================

/**
 * Inicia sessão segura com timeout automático
 * Usa configurações do config.php
 * 
 * @return void
 */
function start_secure_session(): void {
    if (session_status() === PHP_SESSION_NONE) {
        if (PHP_VERSION_ID >= 70300) {
            session_set_cookie_params([
                'lifetime' => SESSION_LIFETIME,
                'path' => '/',
                'secure' => IS_SECURE,
                'httponly' => SESSION_COOKIE_HTTPONLY,
                'samesite' => IS_PRODUCTION ? 'Strict' : 'Lax'
            ]);
        }
        session_start();
    }

    // Verificar timeout de sessão
    if (isset($_SESSION['user'])) {
        $timeout = $_SESSION['user']['last_activity'] ?? 0;
        if ((time() - $timeout) > SESSION_LIFETIME) {
            session_unset();
            session_destroy();
            responder_nao_autenticado('Sessão expirada');
        }
        $_SESSION['user']['last_activity'] = time();
    }
}

/**
 * Gera ou retorna token CSRF
 * 
 * @return string Token CSRF
 */
function csrf_token(): string {
    if (empty($_SESSION['csrf_token']) || (isset($_SESSION['csrf_token_time']) && time() - $_SESSION['csrf_token_time'] > 3600)) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        $_SESSION['csrf_token_time'] = time();
    }
    return $_SESSION['csrf_token'];
}

/**
 * Valida token CSRF
 * 
 * @param string $token Token a validar
 * @return bool True se válido
 */
function validate_csrf_token(string $token): bool {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Sanitiza string para output HTML
 * 
 * @param string $s String a sanitizar
 * @return string String sanitizada
 */
function sanitize(string $s): string {
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

// ============================================================
// FIM DO ARQUIVO DE COMPATIBILIDADE
// ============================================================
?>