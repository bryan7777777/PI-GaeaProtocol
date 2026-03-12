<?php
/**
 * API para Registrar Partidas
 * Endpoint POST que registra uma nova partida no banco
 * 
 * Uso:
 * POST /php/registrar_partida.php
 * Content-Type: application/json
 * 
 * Body:
 * {
 *   "resultado": "Vitória|Derrota",
 *   "lixoColetado": 150,
 *   "wavesCompletadas": 10,
 *   "tempoJogo": 1800,
 *   "protocoloUsado": "Gleba",
 *   "dificuldade": "Normal"
 * }
 */

require_once 'config.php';
start_secure_session();

header('Content-Type: application/json');

// Verifica autenticação
if (empty($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Não autenticado']);
    exit;
}

// Verifica se é POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);
    exit;
}

// Recebe dados JSON
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'JSON inválido']);
    exit;
}

// Extrai dados
$userId = $_SESSION['user']['id'];
$resultado = strtolower(trim($data['resultado'] ?? ''));
$lixoColetado = intval($data['lixoColetado'] ?? 0);
$wavesCompletadas = intval($data['wavesCompletadas'] ?? 0);
$tempoJogo = intval($data['tempoJogo'] ?? 0);
$protocoloUsado = trim($data['protocoloUsado'] ?? 'Desconhecido');
$dificuldade = trim($data['dificuldade'] ?? 'Normal');

// Validações
if (!in_array($resultado, ['vitória', 'derrota'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Resultado deve ser "Vitória" ou "Derrota"']);
    exit;
}

if ($lixoColetado < 0 || $wavesCompletadas < 0 || $tempoJogo < 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Valores numéricos não podem ser negativos']);
    exit;
}

// Capitaliza resultado para padronização
$resultado = ucfirst($resultado);

try {
    // Inicia transação
    $pdo->beginTransaction();
    
    // Insere partida
    $stmt = $pdo->prepare("
        INSERT INTO partidas 
        (idUser, dataPartida, resultado, lixoColetado, wavesCompletadas, tempoJogo, protocoloUsado, dificuldade)
        VALUES (?, NOW(), ?, ?, ?, ?, ?, ?)
    ");
    
    $stmt->execute([
        $userId,
        $resultado,
        $lixoColetado,
        $wavesCompletadas,
        $tempoJogo,
        $protocoloUsado,
        $dificuldade
    ]);
    
    $idPartida = $pdo->lastInsertId();
    
    // Atualiza userStatus
    $stmt = $pdo->prepare("
        SELECT idUserStatus FROM userStatus WHERE idUser = ?
    ");
    $stmt->execute([$userId]);
    $status = $stmt->fetch();
    
    if ($status) {
        // Usuário já tem status - atualizar
        $stmt = $pdo->prepare("
            UPDATE userStatus SET
                ultimoLoginJogo = NOW(),
                lixoTotal = lixoTotal + ?,
                lixoUnic = CASE WHEN ? > 0 THEN lixoUnic + 1 ELSE lixoUnic END,
                qtdWin = CASE WHEN ? = 'Vitória' THEN qtdWin + 1 ELSE qtdWin END,
                qtdJogo = qtdJogo + 1
            WHERE idUser = ?
        ");
        $stmt->execute([
            $lixoColetado,
            $lixoColetado,
            $resultado,
            $userId
        ]);
    } else {
        // Criar novo status
        $vitarias = ($resultado === 'Vitória') ? 1 : 0;
        $stmt = $pdo->prepare("
            INSERT INTO userStatus 
            (idUser, ultimoLoginJogo, lixoTotal, lixoUnic, qtdWin, qtdJogo)
            VALUES (?, NOW(), ?, 1, ?, 1)
        ");
        $stmt->execute([
            $userId,
            $lixoColetado,
            $vitarias
        ]);
    }
    
    // Commit transação
    $pdo->commit();
    
    // ===== ENVIAR NOTIFICAÇÃO POR EMAIL =====
    // Busca dados do usuário para enviar notificação
    $stmt = $pdo->prepare("SELECT nome, email FROM user WHERE idUser = ?");
    $stmt->execute([$userId]);
    $userData = $stmt->fetch();
    
    if ($userData && !empty($userData['email'])) {
        $partidaData = [
            'lixoColetado' => $lixoColetado,
            'wavesCompletadas' => $wavesCompletadas,
            'tempoJogo' => $tempoJogo,
            'dificuldade' => $dificuldade,
            'protocoloUsado' => $protocoloUsado
        ];
        
        // Enviar notificação apropriada
        if ($resultado === 'Vitória') {
            send_victory_notification($userData['email'], $userData['nome'], $partidaData);
        } else {
            send_defeat_notification($userData['email'], $userData['nome'], $partidaData);
        }
    }
    // ===== FIM DE NOTIFICAÇÃO =====
    
    // Resposta de sucesso
    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Partida registrada com sucesso',
        'idPartida' => $idPartida,
        'data' => [
            'resultado' => $resultado,
            'lixoColetado' => $lixoColetado,
            'wavesCompletadas' => $wavesCompletadas,
            'tempoJogo' => $tempoJogo,
            'protocoloUsado' => $protocoloUsado,
            'dificuldade' => $dificuldade
        ]
    ]);
    
} catch (PDOException $e) {
    // Rollback em caso de erro
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    
    error_log('Erro ao registrar partida: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao registrar partida']);
    exit;
}
