<?php
/**
 * API - Histórico de Partidas do Usuário
 * GET /php/api/user_matches.php?limit=10&offset=0
 * 
 * Retorna JSON com histórico de partidas do usuário
 */

require_once '../config.php';
start_secure_session();

header('Content-Type: application/json');

// Verifica autenticação
if (empty($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Não autenticado']);
    exit;
}

$userId = $_SESSION['user']['id'];
$limit = min((int)($_GET['limit'] ?? 10), 50); // Máximo 50 para segurança
$offset = max(0, (int)($_GET['offset'] ?? 0));

try {
    // Busca partidas recentes
    $stmt = $pdo->prepare("
        SELECT 
            idPartida,
            dataPartida,
            resultado,
            lixoColetado,
            wavesCompletadas,
            tempoJogo,
            protocoloUsado,
            dificuldade
        FROM partidas 
        WHERE idUsuario = ? 
        ORDER BY dataPartida DESC
        LIMIT ? OFFSET ?
    ");
    $stmt->execute([$userId, $limit, $offset]);
    $partidas = $stmt->fetchAll();
    
    // Total de partidas para paginação
    $stmt = $pdo->prepare("SELECT COUNT(*) as total FROM partidas WHERE idUsuario = ?");
    $stmt->execute([$userId]);
    $total = $stmt->fetch()['total'];
    
    // Formata dados
    $partidasFormatadas = [];
    foreach ($partidas as $p) {
        $minutos = intval($p['tempoJogo'] / 60);
        $segundos = $p['tempoJogo'] % 60;
        
        $partidasFormatadas[] = [
            'id' => (int)$p['idPartida'],
            'data' => (new DateTime($p['dataPartida']))->format('d/m/Y H:i'),
            'resultado' => $p['resultado'],
            'lixoColetado' => (int)$p['lixoColetado'],
            'wavesCompletadas' => (int)$p['wavesCompletadas'],
            'duração' => sprintf('%02d:%02d', $minutos, $segundos),
            'protocolo' => $p['protocoloUsado'] ?? 'Desconhecido',
            'dificuldade' => $p['dificuldade'] ?? 'Normal'
        ];
    }
    
    // Retorna dados
    echo json_encode([
        'success' => true,
        'partidas' => $partidasFormatadas,
        'paginação' => [
            'total' => (int)$total,
            'limit' => $limit,
            'offset' => $offset,
            'páginas' => ceil($total / $limit)
        ]
    ]);
    
} catch (PDOException $e) {
    error_log('Erro ao buscar partidas: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao buscar partidas']);
}
?>
