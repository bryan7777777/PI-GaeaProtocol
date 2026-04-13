<?php
/**
 * API REST: Registrar Partida
 * 
 * Arquivo: /php/api/partida.php
 * Descrição: Endpoint POST que recebe, valida e persiste dados de partidas do jogo
 *           no banco MySQL. Autoupdatiza estatísticas do usuário.
 * 
 * Método: POST
 * Content-Type: application/json
 * Autenticação: Sessão PHP ($_SESSION['user'])
 * 
 * Exemplo de Payload:
 * {
 *   "usuario_id": 42,
 *   "resultado": "vitoria",
 *   "pontuacao": 3200,
 *   "duracao_segundos": 450,
 *   "data_hora": "2026-04-13T14:30:00",
 *   "estatisticas": {
 *     "cartas_jogadas": 27,
 *     "dinheiro_acumulado": 850,
 *     "dinheiro_gasto": 620,
 *     "lixo_reciclado": 14,
 *     "dano_total": 4300,
 *     "cura_total": 800,
 *     "rodadas_sobrevividas": 9
 *   }
 * }
 */

// Incluir configuração e iniciar sessão segura
require_once __DIR__ . '/../config.php';
start_secure_session();

// Configurar header de resposta JSON
header('Content-Type: application/json; charset=utf-8');

// ============================================================
// FUNÇÕES AUXILIARES
// ============================================================

/**
 * Valida se o usuário está autenticado
 * Retorna true se válido, false caso contrário
 */
function validar_autenticacao(): bool {
    return !empty($_SESSION['user']) && !empty($_SESSION['user']['id']);
}

/**
 * Valida o método HTTP
 * Apenas POST é aceito
 */
function validar_metodo_http(): bool {
    return $_SERVER['REQUEST_METHOD'] === 'POST';
}

/**
 * Decodifica e valida JSON do corpo da requisição
 * Retorna array associativo ou null se inválido
 */
function obter_dados_json(): ?array {
    $json_raw = file_get_contents('php://input');
    $data = json_decode($json_raw, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        return null;
    }

    return is_array($data) ? $data : null;
}

/**
 * Valida campo de resultado
 * Aceita: vitoria, derrota (case-insensitive)
 */
function validar_resultado(string $resultado): bool {
    $resultado = strtolower(trim($resultado));
    return in_array($resultado, ['vitoria', 'derrota'], true);
}

/**
 * Valida se um inteiro está dentro de um intervalo
 */
function validar_inteiro(mixed $valor, int $minimo = 0, int $maximo = PHP_INT_MAX): bool {
    if (!is_numeric($valor)) {
        return false;
    }
    $int_valor = intval($valor);
    return $int_valor >= $minimo && $int_valor <= $maximo;
}

/**
 * Valida formato ISO 8601 de data
 */
function validar_data_iso8601(string $data): bool {
    $formato = '\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}';
    return preg_match("/^{$formato}Z?$/", $data) === 1;
}

/**
 * Sanitiza inteiro
 */
function sanitizar_inteiro(mixed $valor, int $padrao = 0): int {
    return validar_inteiro($valor) ? intval($valor) : $padrao;
}

/**
 * Sanitiza string
 */
function sanitizar_string(mixed $valor, string $padrao = ''): string {
    if (!is_string($valor)) {
        return $padrao;
    }
    return htmlspecialchars(trim($valor), ENT_QUOTES, 'UTF-8');
}

/**
 * Responde com erro JSON
 */
function responder_erro(string $mensagem, int $codigo_http = 400): void {
    http_response_code($codigo_http);
    echo json_encode([
        'status' => 'erro',
        'mensagem' => $mensagem,
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    exit;
}

/**
 * Responde com sucesso JSON
 */
function responder_sucesso(array $dados = [], string $mensagem = 'Operação realizada com sucesso'): void {
    http_response_code(200);
    echo json_encode([
        'status' => 'ok',
        'mensagem' => $mensagem,
        'dados' => $dados,
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    exit;
}

// ============================================================
// VALIDAÇÕES INICIAIS
// ============================================================

// Validar autenticação
if (!validar_autenticacao()) {
    responder_erro('Usuário não autenticado. Faça login para continuar.', 401);
}

// Validar método HTTP
if (!validar_metodo_http()) {
    responder_erro('Método HTTP não permitido. Use POST.', 405);
}

// Obter dados JSON
$dados = obter_dados_json();
if ($dados === null) {
    responder_erro('JSON inválido ou vazio no corpo da requisição.', 400);
}

// ============================================================
// VALIDAÇÃO E SANITIZAÇÃO DE DADOS
// ============================================================

// Extrair e validar usuario_id
$usuario_id_requisicao = intval($dados['usuario_id'] ?? 0);
$usuario_id_sessao = $_SESSION['user']['id'] ?? 0;

// REGRA DE SEGURANÇA: usuario_id da requisição DEVE ser igual ao da sessão
if ($usuario_id_requisicao !== $usuario_id_sessao) {
    error_log("Tentativa de spoofing de user_id: sessão={$usuario_id_sessao}, requisição={$usuario_id_requisicao}");
    responder_erro('Usuário da requisição não corresponde à sessão.', 403);
}

// Validar resultado
$resultado = strtolower(trim($dados['resultado'] ?? ''));
if (!validar_resultado($resultado)) {
    responder_erro('Campo "resultado" deve ser "vitoria" ou "derrota".', 400);
}
$resultado = ucfirst($resultado); // Padronizar: Vitoria, Derrota

// Validar pontuação
$pontuacao = sanitizar_inteiro($dados['pontuacao'] ?? 0, 0);
if (!validar_inteiro($pontuacao, 0, 999999)) {
    responder_erro('Campo "pontuacao" deve ser um inteiro não-negativo.', 400);
}

// Validar duração (em segundos)
$duracao_segundos = sanitizar_inteiro($dados['duracao_segundos'] ?? 0, 0);
if (!validar_inteiro($duracao_segundos, 0, 86400)) { // máx 24 horas
    responder_erro('Campo "duracao_segundos" deve estar entre 0 e 86400.', 400);
}

// Validar data/hora
$data_hora = trim($dados['data_hora'] ?? '');
if (empty($data_hora)) {
    $data_hora = date('Y-m-d\TH:i:s');
} else {
    if (!validar_data_iso8601($data_hora)) {
        responder_erro('Campo "data_hora" deve estar no formato ISO 8601 (YYYY-MM-DDTHH:MM:SS).', 400);
    }
    // Converter para formato MySQL (remove T e Z)
    $data_hora = str_replace(['T', 'Z'], [' ', ''], $data_hora);
}

// Validar estatísticas (objeto aninhado)
$stats = $dados['estatisticas'] ?? [];
if (!is_array($stats)) {
    responder_erro('Campo "estatisticas" deve ser um objeto JSON.', 400);
}

// Sanitizar estatísticas
$cartas_jogadas = sanitizar_inteiro($stats['cartas_jogadas'] ?? 0, 0);
$dinheiro_acumulado = sanitizar_inteiro($stats['dinheiro_acumulado'] ?? 0, 0);
$dinheiro_gasto = sanitizar_inteiro($stats['dinheiro_gasto'] ?? 0, 0);
$lixo_reciclado = sanitizar_inteiro($stats['lixo_reciclado'] ?? 0, 0);
$dano_total = sanitizar_inteiro($stats['dano_total'] ?? 0, 0);
$cura_total = sanitizar_inteiro($stats['cura_total'] ?? 0, 0);
$rodadas_sobrevividas = sanitizar_inteiro($stats['rodadas_sobrevividas'] ?? 0, 0);

// Validar ranges de estatísticas
if ($cartas_jogadas < 0 || $cartas_jogadas > 1000) {
    responder_erro('Campo "cartas_jogadas" deve estar entre 0 e 1000.', 400);
}
if ($dinheiro_acumulado < 0 || $dinheiro_acumulado > 999999) {
    responder_erro('Campo "dinheiro_acumulado" deve estar entre 0 e 999999.', 400);
}
if ($dinheiro_gasto < 0 || $dinheiro_gasto > 999999) {
    responder_erro('Campo "dinheiro_gasto" deve estar entre 0 e 999999.', 400);
}

// ============================================================
// INSERIR DADOS NO BANCO
// ============================================================

try {
    // Iniciar transação para garantir integridade
    $pdo->beginTransaction();

    // 1. INSERIR NA TABELA PARTIDAS
    $stmt_partida = $pdo->prepare("
        INSERT INTO partidas (
            idUser, 
            dataPartida, 
            resultado, 
            pontuacao, 
            duracao_segundos, 
            data_hora
        ) VALUES (
            :usuario_id,
            NOW(),
            :resultado,
            :pontuacao,
            :duracao_segundos,
            :data_hora
        )
    ");

    $stmt_partida->execute([
        ':usuario_id' => $usuario_id_sessao,
        ':resultado' => $resultado,
        ':pontuacao' => $pontuacao,
        ':duracao_segundos' => $duracao_segundos,
        ':data_hora' => $data_hora
    ]);

    // Obter ID da partida inserida
    $partida_id = $pdo->lastInsertId();

    // 2. INSERIR NA TABELA ESTATISTICAS_PARTIDA
    $stmt_stats = $pdo->prepare("
        INSERT INTO estatisticas_partida (
            idPartida,
            cartas_jogadas,
            dinheiro_acumulado,
            dinheiro_gasto,
            lixo_reciclado,
            dano_total,
            cura_total,
            rodadas_sobrevividas
        ) VALUES (
            :partida_id,
            :cartas_jogadas,
            :dinheiro_acumulado,
            :dinheiro_gasto,
            :lixo_reciclado,
            :dano_total,
            :cura_total,
            :rodadas_sobrevividas
        )
    ");

    $stmt_stats->execute([
        ':partida_id' => $partida_id,
        ':cartas_jogadas' => $cartas_jogadas,
        ':dinheiro_acumulado' => $dinheiro_acumulado,
        ':dinheiro_gasto' => $dinheiro_gasto,
        ':lixo_reciclado' => $lixo_reciclado,
        ':dano_total' => $dano_total,
        ':cura_total' => $cura_total,
        ':rodadas_sobrevividas' => $rodadas_sobrevividas
    ]);

    // 3. ATUALIZAR ESTATÍSTICAS ACUMULADAS DO USUÁRIO
    // Verificar se já existe registro em userStatus
    $stmt_check = $pdo->prepare("SELECT idUserStatus FROM userStatus WHERE idUser = :usuario_id LIMIT 1");
    $stmt_check->execute([':usuario_id' => $usuario_id_sessao]);
    $user_status_existe = $stmt_check->fetch();

    if (!$user_status_existe) {
        // Criar novo registro se não existir
        $stmt_insert_status = $pdo->prepare("
            INSERT INTO userStatus (
                idUser,
                ultimoLoginJogo,
                lixoTotal,
                qtdWin,
                qtdJogo,
                total_vitorias,
                pontuacao_total,
                dano_total_acumulado,
                cura_total_acumulada,
                lixo_total_acumulado
            ) VALUES (
                :usuario_id,
                NOW(),
                :lixo_reciclado,
                :vitoria,
                1,
                :vitoria,
                :pontuacao,
                :dano_total,
                :cura_total,
                :lixo_reciclado
            )
        ");

        $vitoria_int = ($resultado === 'Vitoria') ? 1 : 0;

        $stmt_insert_status->execute([
            ':usuario_id' => $usuario_id_sessao,
            ':lixo_reciclado' => $lixo_reciclado,
            ':vitoria' => $vitoria_int,
            ':pontuacao' => $pontuacao,
            ':dano_total' => $dano_total,
            ':cura_total' => $cura_total
        ]);
    } else {
        // Atualizar registro existente
        $vitoria_int = ($resultado === 'Vitoria') ? 1 : 0;

        $stmt_update_status = $pdo->prepare("
            UPDATE userStatus SET
                ultimoLoginJogo = NOW(),
                lixoTotal = lixoTotal + :lixo_reciclado,
                qtdWin = qtdWin + :vitoria,
                qtdJogo = qtdJogo + 1,
                total_vitorias = total_vitorias + :vitoria,
                pontuacao_total = pontuacao_total + :pontuacao,
                dano_total_acumulado = dano_total_acumulado + :dano_total,
                cura_total_acumulada = cura_total_acumulada + :cura_total,
                lixo_total_acumulado = lixo_total_acumulado + :lixo_reciclado
            WHERE idUser = :usuario_id
        ");

        $stmt_update_status->execute([
            ':usuario_id' => $usuario_id_sessao,
            ':lixo_reciclado' => $lixo_reciclado,
            ':vitoria' => $vitoria_int,
            ':pontuacao' => $pontuacao,
            ':dano_total' => $dano_total,
            ':cura_total' => $cura_total
        ]);
    }

    // Confirmar transação
    $pdo->commit();

    // Log no servidor para auditoria
    error_log("Partida registrada: usuario_id={$usuario_id_sessao}, partida_id={$partida_id}, resultado={$resultado}, pontuacao={$pontuacao}");

    // Responder com sucesso
    responder_sucesso(
        [
            'partida_id' => intval($partida_id),
            'usuario_id' => $usuario_id_sessao,
            'resultado' => $resultado,
            'pontuacao' => $pontuacao
        ],
        'Partida salva com sucesso.'
    );

} catch (PDOException $e) {
    // Desfazer transação em caso de erro
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    // Log do erro
    error_log("Erro ao registrar partida: " . $e->getMessage());

    // Responder com erro genérico por segurança
    responder_erro('Erro ao salvar partida. Tente novamente mais tarde.', 500);

} catch (Exception $e) {
    // Desfazer transação em caso de erro inesperado
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    error_log("Erro inesperado ao registrar partida: " . $e->getMessage());
    responder_erro('Erro inesperado. Tente novamente mais tarde.', 500);
}
