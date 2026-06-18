<?php
/**
 * API para Registrar Partidas
 *
 * CORRIGIDO: header JSON sempre no topo, erros PHP suprimidos,
 *            cartas_jogadas lido e salvo, validação server-side de vitória,
 *            ob_start() para capturar output acidental.
 */

// CORRIGIDO: Captura qualquer output acidental (espaços, warnings, etc)
ob_start();

// CORRIGIDO: Content-Type JSON antes de qualquer output
header('Content-Type: application/json');
// CORRIGIDO: Erros PHP não vazam HTML para o JS
ini_set('display_errors', 0);
error_reporting(0);


require_once __DIR__ . '/email_service.php';
try {
    require_once 'config.php';
    start_secure_session();

    // Verifica autenticação
    if (empty($_SESSION['user'])) {
        ob_end_clean();
        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Não autenticado']);
        exit;
    }

    // Verifica método
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        ob_end_clean();
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Método não permitido']);
        exit;
    }

    // Recebe e decodifica JSON
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);

    if (!$data) {
        ob_end_clean();
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'JSON inválido']);
        exit;
    }

    // Extrai dados da requisição
    $userId          = $_SESSION['user']['id'];
    $resultado       = strtolower(trim($data['resultado'] ?? ''));
    $lixoColetado    = max(0, intval($data['lixoColetado']    ?? 0));
    $wavesCompletadas= max(0, intval($data['wavesCompletadas'] ?? 0));
    $tempoJogo       = max(0, intval($data['tempoJogo']        ?? 0));
    $protocoloUsado  = trim($data['protocoloUsado'] ?? 'Desconhecido');
    $dificuldade     = trim($data['dificuldade']    ?? 'Normal');
    $faseAtual       = max(0, intval($data['fase_atual']       ?? 0));
    $pontuacao       = max(0, intval($data['pontuacao']        ?? 0));

    // CORRIGIDO: cartas_jogadas lido do payload e sanitizado
    $cartasJogadas   = max(0, intval($data['cartas_jogadas']   ?? 0));

    // Validação de resultado
    if (!in_array($resultado, ['vitória', 'derrota', 'vitoria'])) {
        ob_end_clean();
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Resultado inválido']);
        exit;
    }

    // CORRIGIDO: Normaliza para banco com tudo minúsculo (vitoria/derrota)
    $resultadoDb = (strpos($resultado, 'vit') !== false) ? 'vitoria' : 'derrota';

    // CORRIGIDO: Validação server-side — vitória só aceita se fase_atual >= total de fases (35)
    $totalFases = 35;
    if ($resultadoDb === 'vitoria' && $faseAtual < $totalFases) {
        // Registra como derrota se as fases não foram completadas
        error_log("[Partida] Vitória rejeitada: fase_atual={$faseAtual} < {$totalFases}");
        $resultadoDb = 'derrota';
    }

    // Insere partida
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("
        INSERT INTO partidas
            (idUsuario, resultado, pontuacao, lixoColetado, wavesCompletadas, duracaoSegundos, dificuldade)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $userId,
        $resultadoDb,
        $pontuacao,
        $lixoColetado,
        $wavesCompletadas,
        $tempoJogo,
        $dificuldade
    ]);

    $idPartida = $pdo->lastInsertId();

    // CORRIGIDO: Tenta inserir cartas_jogadas na tabela de estatísticas (se existir)
    try {
        $stmtStats = $pdo->prepare("
            INSERT INTO estatisticas_partida
                (idPartida, cartas_jogadas, lixo_reciclado, rodadas_sobrevividas)
            VALUES (?, ?, ?, ?)
        ");
        $stmtStats->execute([
            $idPartida,
            $cartasJogadas,
            $lixoColetado,
            $wavesCompletadas
        ]);
    } catch (Exception $eStats) {
        // Tabela de estatísticas pode não existir — não bloqueia o registro principal
        error_log('[Partida] Aviso: estatisticas_partida não pôde ser inserida: ' . $eStats->getMessage());
    }

    // Atualiza totais do usuário
    $vitoria = ($resultadoDb === 'vitoria') ? 1 : 0;
    $stmtUser = $pdo->prepare("
        UPDATE usuarios SET
            totalPartidas  = totalPartidas  + 1,
            totalVitorias  = totalVitorias  + ?,
            pontuacaoTotal = pontuacaoTotal + ?,
            lixoReciclado  = lixoReciclado  + ?,
            ultimoAcesso   = NOW()
        WHERE idUsuario = ?
    ");
    $stmtUser->execute([$vitoria, $pontuacao, $lixoColetado, $userId]);

    $pdo->commit();

    ob_end_clean();
    echo json_encode([
        'success'   => true,
        'idPartida' => intval($idPartida),
        'resultado' => $resultadoDb,
        'cartas_jogadas' => $cartasJogadas
    ]);

} catch (Exception $e) {
    ob_end_clean();
    if (isset($pdo) && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    error_log('[Partida] Erro: ' . $e->getMessage());
    // CORRIGIDO: Retorna JSON mesmo em caso de exceção
    http_response_code(500);
    echo json_encode(['success' => false, 'erro' => $e->getMessage()]);
}
exit;