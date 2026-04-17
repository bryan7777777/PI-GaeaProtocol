<?php
/**
 * API - Ranking Pessoal do Usuário
 * GET /php/api/user_rank.php
 * 
 * Retorna posição do usuário no ranking global
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

try {
    // Busca dados do usuário
    $stmt = $pdo->prepare("
        SELECT u.nomeUsuario, u.Avatar, u.pontuacaoTotal as pontuacao, COUNT(CASE WHEN p.resultado = 'vitoria' THEN 1 END) as qtdWin, COUNT(p.idPartida) as qtdJogo
        FROM usuarios u
        LEFT JOIN partidas p ON u.idUsuario = p.idUsuario
        WHERE u.idUsuario = ?
        GROUP BY u.idUsuario
        LIMIT 1
    ");
    $stmt->execute([$userId]);
    $userData = $stmt->fetch();
    
    if (!$userData) {
        http_response_code(404);
        echo json_encode(['error' => 'Usuário não encontrado']);
        exit;
    }
    
    // Conta quantos usuários estão acima (ranking)
    $stmt = $pdo->prepare("
        SELECT COUNT(*) as posicao
        FROM usuarios
        WHERE pontuacaoTotal > (SELECT pontuacaoTotal FROM usuarios WHERE idUsuario = ?)
    ");
    $stmt->execute([$userId]);
    $posicao = $stmt->fetch()['posicao'] + 1;
    
    // Total de usuários
    $stmt = $pdo->prepare("SELECT COUNT(*) as total FROM usuarios");
    $stmt->execute();
    $totalUsuarios = $stmt->fetch()['total'];
    
    // Win rate
    $totalPartidas = $userData['qtdJogo'] ?? 0;
    $vitórias = $userData['qtdWin'] ?? 0;
    $winRate = $totalPartidas > 0 
        ? round(($vitórias / $totalPartidas) * 100, 2)
        : 0;
    
    // Retorna dados
    echo json_encode([
        'success' => true,
        'rank' => [
            'usuario' => $userData['nomeUsuario'] ?? 'Jogador',
            'avatar' => $userData['Avatar'] ?? null,
            'pontuação' => (int)($userData['pontuacao'] ?? 0),
            'vitórias' => (int)$vitórias,
            'derrotas' => max(0, $totalPartidas - $vitórias),
            'winRate' => (float)$winRate,
            'posição' => (int)$posicao,
            'totalJogadores' => (int)$totalUsuarios
        ]
    ]);
    
} catch (PDOException $e) {
    error_log('Erro ao buscar ranking: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao buscar ranking']);
}
?>
