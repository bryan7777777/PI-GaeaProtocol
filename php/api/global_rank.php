<?php
/**
 * API - Ranking Global de Todos os Jogadores
 * GET /php/api/global_rank.php?limit=10&offset=0
 * 
 * Retorna JSON com os top jogadores do sistema
 */

require_once '../config.php';
start_secure_session();

header('Content-Type: application/json');

$limit = min((int)($_GET['limit'] ?? 10), 100); // Máximo 100 para segurança
$offset = max(0, (int)($_GET['offset'] ?? 0));

try {
    // Busca ranking global
    $stmt = $pdo->prepare("
        SELECT 
            u.idUsuario,
            u.nomeUsuario,
            u.Avatar,
            u.pontuacaoTotal,
            COUNT(CASE WHEN p.resultado = 'vitoria' THEN 1 END) as qtdWin,
            COUNT(p.idPartida) as qtdJogo
        FROM usuarios u
        LEFT JOIN partidas p ON u.idUsuario = p.idUsuario
        GROUP BY u.idUsuario
        ORDER BY u.pontuacaoTotal DESC
        LIMIT ? OFFSET ?
    ");
    $stmt->execute([$limit, $offset]);
    $ranking = $stmt->fetchAll();
    
    // Total de jogadores
    $stmt = $pdo->prepare("SELECT COUNT(*) as total FROM usuarios");
    $stmt->execute();
    $totalJogadores = $stmt->fetch()['total'];
    
    // Formata dados
    $rankingFormatado = [];
    $posicao = $offset + 1;
    
    foreach ($ranking as $jogador) {
        $totalPartidas = $jogador['qtdJogo'] ?? 0;
        $vitórias = $jogador['qtdWin'] ?? 0;
        $winRate = $totalPartidas > 0 
            ? round(($vitórias / $totalPartidas) * 100, 2)
            : 0;
        
        $rankingFormatado[] = [
            'posição' => $posicao++,
            'usuário' => $jogador['nomeUsuario'] ?? 'Jogador ' . $jogador['idUsuario'],
            'avatar' => $jogador['Avatar'] ?? null,
            'pontuação' => (int)($jogador['pontuacaoTotal'] ?? 0),
            'vitórias' => (int)$vitórias,
            'derrotas' => max(0, $totalPartidas - $vitórias),
            'winRate' => (float)$winRate
        ];
    }
    
    // Retorna dados
    echo json_encode([
        'success' => true,
        'ranking' => $rankingFormatado,
        'paginação' => [
            'total' => (int)$totalJogadores,
            'limit' => $limit,
            'offset' => $offset,
            'páginas' => ceil($totalJogadores / $limit)
        ]
    ]);
    
} catch (PDOException $e) {
    error_log('Erro ao buscar ranking global: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao buscar ranking']);
}
?>
