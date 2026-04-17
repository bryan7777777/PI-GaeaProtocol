<?php
/**
 * API - Estatísticas Pessoais do Usuário
 * GET /php/api/user_stats.php
 * 
 * Retorna JSON com:
 * - Total de partidas
 * - Vitórias e derrotas
 * - Win rate (%)
 * - Maior streak de vitórias
 * - Lixo total coletado
 * - Pontuação total
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
        SELECT 
            u.totalPartidas as qtdJogo,
            u.totalVitorias as qtdWin,
            u.lixoReciclado as lixoTotal,
            u.pontuacaoTotal as pontuacao
        FROM usuarios u
        WHERE u.idUsuario = ?
        LIMIT 1
    ");
    $stmt->execute([$userId]);
    $status = $stmt->fetch();
    
    // Se não existe, retorna valores zerados
    if (!$status) {
        $status = [
            'qtdJogo' => 0,
            'qtdWin' => 0,
            'lixoTotal' => 0,
            'pontuacao' => 0
        ];
    }
    
    // Calcula derrotas
    $derrotas = max(0, $status['qtdJogo'] - $status['qtdWin']);
    
    // Calcula win rate
    $winRate = $status['qtdJogo'] > 0 
        ? round(($status['qtdWin'] / $status['qtdJogo']) * 100, 2)
        : 0;
    
    // Busca maior streak de vitórias (contando vitórias consecutivas)
    $stmt = $pdo->prepare("
        SELECT resultado 
        FROM partidas 
        WHERE idUsuario = ? 
        ORDER BY dataPartida DESC
        LIMIT 100
    ");
    $stmt->execute([$userId]);
    $partidas = $stmt->fetchAll();
    
    $maxStreak = 0;
    $currentStreak = 0;
    
    foreach ($partidas as $partida) {
        if (strcasecmp($partida['resultado'], 'Vitória') === 0) {
            $currentStreak++;
            $maxStreak = max($maxStreak, $currentStreak);
        } else {
            $currentStreak = 0;
        }
    }
    
    // Busca nome do usuário
    $stmt = $pdo->prepare("
        SELECT nomeUsuario, Avatar 
        FROM usuarios 
        WHERE idUsuario = ?
        LIMIT 1
    ");
    $stmt->execute([$userId]);
    $usuario = $stmt->fetch();
    
    // Retorna dados
    echo json_encode([
        'success' => true,
        'stats' => [
            'usuario' => $usuario['nomeUsuario'] ?? 'Jogador',
            'avatar' => $usuario['Avatar'] ?? null,
            'totalPartidas' => (int)$status['qtdJogo'],
            'vitórias' => (int)$status['qtdWin'],
            'derrotas' => (int)$derrotas,
            'winRate' => (float)$winRate,
            'maiorStreak' => (int)$maxStreak,
            'lixoTotal' => (int)$status['lixoTotal'],
            'pontuação' => (int)$status['pontuacao']
        ]
    ]);
    
} catch (PDOException $e) {
    error_log('Erro ao buscar estatísticas: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao buscar estatísticas']);
}
?>
