<?php
/**
 * ============================================================
 * HELPERS DE RESPOSTA - API JSON Padronizada
 * ============================================================
 * 
 * Arquivo: /php/config/response.php
 * Descrição: Funções auxiliares para retornar respostas JSON
 *            uniformes em toda a API. Todas as respostas
 *            seguem o formato:
 *            {"status":"ok"|"erro", "dados":{...}, "mensagem":"..."}
 *           Inclui funções para sucesso, erro, validação, autenticação, 
 * 
 * Uso:
 *   responder_ok($dados, "Operação concluída");
 *   responder_erro("email_duplicado", "Email já existe");
 *   responder_validacao($erros);
 * 
 * ============================================================
 */

// Garantir que já carregou as configurações
if (!defined('API_RESPONSE_STATUS_OK')) {
    require_once __DIR__ . '/config.php';
}

// ============================================================
// 1. FUNÇÕES PRINCIPAIS DE RESPOSTA
// ============================================================

/**
 * Retorna resposta de sucesso (status:ok)
 * 
 * @param mixed $dados Dados a retornar (array, objeto, etc)
 * @param string $mensagem Mensagem opcional de sucesso
 * @param int $httpCode Código HTTP (padrão: 200)
 * @return void (encerra a execução)
 */
function responder_ok($dados = [], $mensagem = 'Operação realizada com sucesso', $httpCode = HTTP_OK) {
    responder(API_RESPONSE_STATUS_OK, $dados, $mensagem, $httpCode);
}

/**
 * Retorna resposta de erro (status:erro)
 * 
 * @param string $codigo Código de erro (ex: "autenticacao_falhou")
 * @param string $mensagem Mensagem de erro descritiva
 * @param int $httpCode Código HTTP (padrão: 400)
 * @return void (encerra a execução)
 */
function responder_erro($codigo, $mensagem, $httpCode = HTTP_BAD_REQUEST) {
    responder(API_RESPONSE_STATUS_ERROR, ['codigo' => $codigo], $mensagem, $httpCode);
}

/**
 * Retorna resposta de erro de validação
 * Agrupa múltiplos erros de campos
 * 
 * @param array $erros Array em formato ["campo" => "mensagem"]
 * @param string $mensagem Mensagem geral (padrão: "Validação falhou")
 * @return void (encerra a execução)
 */
function responder_validacao($erros, $mensagem = 'Validação falhou') {
    responder(API_RESPONSE_STATUS_ERROR, ['erros' => $erros], $mensagem, HTTP_BAD_REQUEST);
}

/**
 * Retorna resposta de erro de autenticação
 * 
 * @param string $mensagem Mensagem opcional
 * @return void (encerra a execução)
 */
function responder_nao_autenticado($mensagem = 'Autenticação necessária') {
    responder(API_RESPONSE_STATUS_ERROR, ['codigo' => 'nao_autenticado'], $mensagem, HTTP_UNAUTHORIZED);
}

/**
 * Retorna resposta de erro de autorização
 * 
 * @param string $mensagem Mensagem opcional
 * @return void (encerra a execução)
 */
function responder_nao_autorizado($mensagem = 'Acesso negado') {
    responder(API_RESPONSE_STATUS_ERROR, ['codigo' => 'nao_autorizado'], $mensagem, HTTP_FORBIDDEN);
}

/**
 * Retorna resposta de recurso não encontrado
 * 
 * @param string $recurso Nome do recurso (ex: "Usuário")
 * @return void (encerra a execução)
 */
function responder_nao_encontrado($recurso = 'Recurso') {
    responder(API_RESPONSE_STATUS_ERROR, ['codigo' => 'nao_encontrado'], "$recurso não encontrado", HTTP_NOT_FOUND);
}

/**
 * Retorna resposta de conflito (ex: email duplicado)
 * 
 * @param string $campo Campo que gerou conflito
 * @param string $mensagem Mensagem opcional
 * @return void (encerra a execução)
 */
function responder_conflito($campo, $mensagem = null) {
    $msg = $mensagem ?? ucfirst($campo) . ' já existe';
    responder(API_RESPONSE_STATUS_ERROR, ['codigo' => 'conflito', 'campo' => $campo], $msg, HTTP_CONFLICT);
}

/**
 * Retorna resposta de erro interno do servidor
 * 
 * @param string $mensagem Mensagem opcional
 * @param string $detalhes Detalhes técnicos (apenas em desenvolvimento)
 * @return void (encerra a execução)
 */
function responder_erro_interno($mensagem = 'Erro interno do servidor', $detalhes = '') {
    $dados = ['codigo' => 'erro_interno'];
    
    // Adicionar detalhes apenas em desenvolvimento
    if (!IS_PRODUCTION && $detalhes) {
        $dados['detalhes'] = $detalhes;
    }
    
    responder(API_RESPONSE_STATUS_ERROR, $dados, $mensagem, HTTP_INTERNAL_SERVER_ERROR);
}

/**
 * Retorna resposta de método não permitido
 * 
 * @return void (encerra a execução)
 */
function responder_metodo_nao_permitido() {
    responder(API_RESPONSE_STATUS_ERROR, ['codigo' => 'metodo_nao_permitido'], 
              'Método HTTP não permitido', HTTP_METHOD_NOT_ALLOWED);
}

// ============================================================
// 2. FUNÇÃO CENTRAL DE RESPOSTA
// ============================================================

/**
 * Função central que formata e retorna a resposta JSON
 * Seguindo o padrão: {"status":"ok"|"erro", "dados":{...}, "mensagem":"..."}
 * 
 * @param string $status "ok" ou "erro"
 * @param mixed $dados Dados a retornar
 * @param string $mensagem Mensagem descritiva
 * @param int $httpCode Código HTTP a retornar
 * @return void (encerra a execução via exit)
 */
function responder($status, $dados = [], $mensagem = '', $httpCode = 200) {
    // Garantir que não há output prévio
    if (ob_get_level() > 0) {
        ob_clean();
    }

    // Definir headers de resposta
    http_response_code($httpCode);
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    header('Cache-Control: no-cache, no-store, must-revalidate');
    header('Pragma: no-cache');

    // Montar resposta JSON
    $resposta = [
        'status' => $status,
        'mensagem' => $mensagem,
        'dados' => $dados,
        'timestamp' => date('Y-m-d H:i:s')
    ];

    // Se em desenvolvimento, adicionar informação de debug
    if (!IS_PRODUCTION && defined('DEBUG_MODE') && DEBUG_MODE) {
        $resposta['debug'] = [
            'arquivo' => $_SERVER['SCRIPT_FILENAME'] ?? 'N/A',
            'metodo' => $_SERVER['REQUEST_METHOD'] ?? 'N/A',
            'timestamp_ms' => round(microtime(true) * 1000)
        ];
    }

    // Retornar JSON e encerrar
    echo json_encode($resposta, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit();
}

// ============================================================
// 3. VALIDAÇÕES RÁPIDAS
// ============================================================

/**
 * Valida se a requisição é POST
 * Retorna erro se não for
 * 
 * @return bool True se for POST, false caso contrário
 */
function validar_metodo_post() {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        responder_metodo_nao_permitido();
        return false;
    }
    return true;
}

/**
 * Valida se a requisição é GET
 * Retorna erro se não for
 * 
 * @return bool True se for GET, false caso contrário
 */
function validar_metodo_get() {
    if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
        responder_metodo_nao_permitido();
        return false;
    }
    return true;
}

/**
 * Parse JSON do body da requisição
 * Retorna erro se não conseguir fazer parse
 * 
 * @param bool $associativo Se true, retorna array; se false, retorna objeto
 * @return mixed Array/Objeto com dados do JSON, ou null se inválido
 */
function ler_json_input($associativo = true) {
    try {
        $input = file_get_contents('php://input');
        
        if (empty($input)) {
            return null;
        }

        $data = json_decode($input, $associativo);
        
        if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
            responder_erro('json_invalido', 'JSON inválido: ' . json_last_error_msg(), HTTP_BAD_REQUEST);
            return null;
        }

        return $data;
    } catch (Exception $e) {
        responder_erro('erro_leitura', 'Erro ao ler input: ' . $e->getMessage(), HTTP_BAD_REQUEST);
        return null;
    }
}

// ============================================================
// 4. FUNÇÕES DE AUDITORIA EM RESPOSTA
// ============================================================

/**
 * Registra um evento de auditoria e retorna resposta
 * Útil para registrar operações sensíveis
 * 
 * @param string $status "ok" ou "erro"
 * @param string $acao Descrição da ação
 * @param mixed $dados Dados da resposta
 * @param string $mensagem Mensagem
 * @param int $userId ID do usuário (0 se não autenticado)
 * @param int $httpCode Código HTTP
 * @return void
 */
function responder_com_auditoria($status, $acao, $dados, $mensagem, $userId = 0, $httpCode = 200) {
    // Registrar auditoria
    if (function_exists('audit_log')) {
        audit_log(
            $userId,
            $acao,
            $_SERVER['REMOTE_ADDR'] ?? 'UNKNOWN',
            json_encode($dados, JSON_UNESCAPED_UNICODE)
        );
    }

    // Retornar resposta
    responder($status, $dados, $mensagem, $httpCode);
}

// ============================================================
// FIM DO ARQUIVO DE HELPERS
// ============================================================
?>
