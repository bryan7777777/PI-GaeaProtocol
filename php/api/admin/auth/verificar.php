<?php
/**
 * ============================================================================
 * VERIFICAR AUTENTICAÇÃO DO ADMIN
 * ============================================================================
 * 
 * Endpoint: GET /php/api/admin/auth/verificar.php
 * Verifica se usuário autenticado é administrador
 * 
 * Resposta:
 * {
 *   "status": "ok",
 *   "dados": {
 *     "idUsuario": 1,
 *     "nomeUsuario": "Admin User",
 *     "tipoUsuario": "admin"
 *   }
 * }
 * 
 * ============================================================================
 */

header('Content-Type: application/json');

require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/auth.php';

// Inicia sessão
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

try {
    // Verifica se é admin
    $usuario = verificar_admin();
    
    responder_ok($usuario, 'Admin autenticado');
    
} catch (Exception $e) {
    responder_nao_autorizado('Acesso negado. Apenas admins podem acessar.');
}

?>
