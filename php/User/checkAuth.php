<?php
/**
 * ============================================================
 * API REST - VERIFICAÇÃO DE AUTENTICAÇÃO
 * ============================================================
 * 
 * Arquivo: /php/User/checkAuth.php
 * Descrição: Verifica se usuário está autenticado e retorna
 *            dados básicos para o dashboard
 */

try {
    // Incluir configuração ANTES de settar headers
    require_once __DIR__ . '/../config.php';
    
    // Garantir que retorna JSON em qualquer caso
    header('Content-Type: application/json; charset=utf-8');
    
    // Validar método HTTP
    if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
        http_response_code(405);
        echo json_encode([
            'status' => 'erro',
            'mensagem' => 'Método não permitido',
            'dados' => ['codigo' => 'metodo_nao_permitido']
        ]);
        exit;
    }
    
    // Iniciar sessão
    start_secure_session();
    
    // Verificar autenticação
    if (empty($_SESSION['user'])) {
        http_response_code(401);
        echo json_encode([
            'status' => 'erro',
            'mensagem' => 'Não autenticado',
            'dados' => ['codigo' => 'nao_autenticado'],
            'authenticated' => false
        ]);
        exit;
    }
    
    // Retornar sucesso
    http_response_code(200);
    echo json_encode([
        'status' => 'ok',
        'mensagem' => 'Autenticado',
        'authenticated' => true,
        'dados' => [
            'user' => [
                'id' => $_SESSION['user']['id'] ?? $_SESSION['user']['idUsuario'] ?? null,
                'nome' => $_SESSION['user']['nome'] ?? $_SESSION['user']['nomeUsuario'] ?? 'Usuário',
                'email' => $_SESSION['user']['email'] ?? null,
                'nivelAcesso' => $_SESSION['user']['nivelAcesso'] ?? 'usuario'
            ]
        ]
    ]);
    exit;
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'erro',
        'mensagem' => 'Erro ao verificar autenticação',
        'dados' => ['codigo' => 'erro_interno'],
        'authenticated' => false
    ]);
    exit;
}
?>
