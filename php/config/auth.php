<?php
/**
 * ============================================================================
 * AUTENTICAÇÃO E AUTORIZAÇÃO - Middleware Central
 * ============================================================================
 * 
 * Responsável por:
 * - Verificar autenticação do usuário
 * - Verificar autorização por role (admin/jogador)
 * - Gerenciar sessões seguras
 * - Aplicar proteção CSRF
 * 
 * Uso em endpoints:
 *   require_once __DIR__ . '/auth.php';
 *   verificar_autenticacao();  // Apenas autenticado
 *   verificar_admin();          // Apenas admin
 * 
 * ============================================================================
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/response.php';

// ============================================================================
// 1. VERIFICAR SE SESSÃO ESTÁ INICIADA
// ============================================================================

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// ============================================================================
// 2. FUNÇÃO: Iniciar sessão segura
// ============================================================================
/**
 * Inicia uma sessão PDO-based do usuário
 * @param int $idUsuario - ID do usuário
 * @param string $tipoUsuario - 'admin' ou 'jogador'
 */
function iniciar_sessao_segura($idUsuario, $tipoUsuario) {
    // Regenerar session ID para evitar session fixation
    session_regenerate_id(true);
    
    // Armazenar dados na sessão
    $_SESSION['idUsuario'] = $idUsuario;
    $_SESSION['tipoUsuario'] = $tipoUsuario;
    $_SESSION['loginTimestamp'] = time();
    $_SESSION['userAgent'] = $_SERVER['HTTP_USER_AGENT'] ?? '';
    $_SESSION['ipAddress'] = obter_endereco_ip();
    $_SESSION['csrfToken'] = bin2hex(random_bytes(32));
    
    // Log da autenticação
    log_autenticacao_evento($idUsuario, 'login', 'Login bem-sucedido');
}

// ============================================================================
// 3. FUNÇÃO: Encerrar sessão segura
// ============================================================================
/**
 * Encerra a sessão do usuário de forma segura
 */
function encerrar_sessao_segura() {
    $idUsuario = $_SESSION['idUsuario'] ?? null;
    
    if ($idUsuario) {
        log_autenticacao_evento($idUsuario, 'logout', 'Logout realizado');
    }
    
    session_destroy();
    setcookie(session_name(), '', time() - 3600, '/', '', true, true);
}

// ============================================================================
// 4. FUNÇÃO: Verificar autenticação básica
// ============================================================================
/**
 * Verifica se usuário está autenticado
 * @return array - Dados do usuário {idUsuario, tipoUsuario} ou resposta erro
 */
function verificar_autenticacao() {
    // Validar sessão
    if (empty($_SESSION['idUsuario'])) {
        responder_nao_autenticado('Sessão expirada ou não autenticado');
        exit;
    }
    
    // Validar integridade da sessão
    if (!validar_integridade_sessao()) {
        encerrar_sessao_segura();
        responder_nao_autenticado('Sessão inválida. Faça login novamente.');
        exit;
    }
    
    // Validar timeout da sessão
    $tempoDecorrido = time() - $_SESSION['loginTimestamp'];
    if ($tempoDecorrido > SESSION_LIFETIME) {
        encerrar_sessao_segura();
        responder_nao_autenticado('Sessão expirou. Faça login novamente.');
        exit;
    }
    
    return [
        'idUsuario' => $_SESSION['idUsuario'],
        'tipoUsuario' => $_SESSION['tipoUsuario']
    ];
}

// ============================================================================
// 5. FUNÇÃO: Verificar se é administrador
// ============================================================================
/**
 * Verifica se usuário autenticado é administrador
 * @return array - Dados do admin ou null
 */
function verificar_admin() {
    $usuario = verificar_autenticacao();
    
    if ($usuario['tipoUsuario'] !== 'admin') {
        responder_nao_autorizado('Apenas administradores podem acessar este recurso');
        exit;
    }
    
    return $usuario;
}

// ============================================================================
// 6. FUNÇÃO: Verificar permissão específica
// ============================================================================
/**
 * Verifica se usuário tem acesso a um recurso
 * @param string $tipoAcesso - 'admin' ou 'jogador'
 * @return bool
 */
function verificar_permissao($tipoAcesso = 'jogador') {
    if (empty($_SESSION['idUsuario'])) {
        return false;
    }
    
    if ($tipoAcesso === 'admin') {
        return $_SESSION['tipoUsuario'] === 'admin';
    }
    
    return true;
}

// ============================================================================
// 7. FUNÇÃO: Validar integridade da sessão
// ============================================================================
/**
 * Valida se sessão é a mesma do usuário
 * @return bool
 */
function validar_integridade_sessao() {
    // Verificar User-Agent
    if (($_SERVER['HTTP_USER_AGENT'] ?? '') !== ($_SESSION['userAgent'] ?? '')) {
        return false;
    }
    
    // Verificar IP (opcional, mas recomendado)
    // Descomentar se quiser verificação mais rigorosa
    // if (obter_endereco_ip() !== $_SESSION['ipAddress']) {
    //     return false;
    // }
    
    return true;
}

// ============================================================================
// 8. FUNÇÃO: Obter endereço IP do cliente
// ============================================================================
/**
 * Retorna o IP real do cliente
 * @return string
 */
function obter_endereco_ip() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        return $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        return explode(',', $_SERVER['HTTP_X_FORWARDED_FOR'])[0];
    } else {
        return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    }
}

// ============================================================================
// 9. FUNÇÃO: Log de autenticação
// ============================================================================
/**
 * Registra eventos de autenticação no banco
 * @param int $idUsuario
 * @param string $tipoEvento - 'login', 'logout', 'erro_senha', etc
 * @param string $mensagem
 */
function log_autenticacao_evento($idUsuario, $tipoEvento, $mensagem = '') {
    global $pdo;
    
    if (!$pdo) {
        return; // Silencio se não houver conexão
    }
    
    try {
        $query = "
            INSERT INTO log_autenticacao 
            (idUsuario, tipoEvento, enderecoIPCliente, userAgent, mensagemEvento)
            VALUES (?, ?, ?, ?, ?)
        ";
        
        $stmt = $pdo->prepare($query);
        $stmt->execute([
            $idUsuario,
            $tipoEvento,
            obter_endereco_ip(),
            $_SERVER['HTTP_USER_AGENT'] ?? '',
            $mensagem
        ]);
    } catch (Exception $e) {
        error_log("Erro ao fazer log de autenticação: " . $e->getMessage());
    }
}

// ============================================================================
// 10. FUNÇÃO: Gerar token CSRF
// ============================================================================
/**
 * Retorna token CSRF da sessão atual
 * @return string
 */
function obter_token_csrf() {
    if (empty($_SESSION['csrfToken'])) {
        $_SESSION['csrfToken'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrfToken'];
}

// ============================================================================
// 11. FUNÇÃO: Validar token CSRF
// ============================================================================
/**
 * Valida token CSRF recebido
 * @param string $token
 * @return bool
 */
function validar_token_csrf($token) {
    if (empty($_SESSION['csrfToken']) || empty($token)) {
        return false;
    }
    
    // Comparação segura contra timing attacks
    return hash_equals($_SESSION['csrfToken'], $token);
}

// ============================================================================
// 12. FUNÇÃO: Obter dados da sessão
// ============================================================================
/**
 * Retorna todos os dados da sessão atual
 * @return array
 */
function obter_sessao() {
    return [
        'idUsuario' => $_SESSION['idUsuario'] ?? null,
        'tipoUsuario' => $_SESSION['tipoUsuario'] ?? null,
        'loginTimestamp' => $_SESSION['loginTimestamp'] ?? null,
        'csrfToken' => $_SESSION['csrfToken'] ?? null
    ];
}

// ============================================================================
// 13. FUNÇÃO: Renovar sessão
// ============================================================================
/**
 * Renova o timestamp de timeout da sessão
 */
function renovar_sessao() {
    if (!empty($_SESSION['idUsuario'])) {
        $_SESSION['loginTimestamp'] = time();
    }
}

?>
