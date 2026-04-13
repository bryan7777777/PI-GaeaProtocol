<?php
/**
 * ============================================================
 * API REST - DASHBOARD COMPLETO
 * ============================================================
 * Arquivo: /php/api/dashboard.php
 * 
 * Endpoint:
 *   GET /dashboard.php?usuario_id=42
 *        → Retorna todos os dados do dashboard em um único JSON
 * 
 * Dados retornados:
 *   - Painel do jogador (stats gerais)
 *   - Histórico de partidas (10 últimas com paginação)
 *   - Conquistas (todas 27 com status)
 *   - Ranking mundial (top 10)
 *   - Ranking pessoal (posição)
 * 
 * Autenticação: Obrigatória (sessão PHP)
 * ============================================================
 */

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Cache-Control: no-cache, no-store, must-revalidate');

session_start();

require_once(__DIR__ . '/../config.php');
require_once(__DIR__ . '/../authenticate.php');

// ============================================================
// FUNÇÃO DE RESPOSTA
// ============================================================
function responder($status, $dados = [], $httpCode = 200) {
    http_response_code($httpCode);
    echo json_encode([
        'status' => $status,
        'timestamp' => date('Y-m-d H:i:s'),
        ...$dados
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

// ============================================================
// VALIDAÇÃO
// ============================================================
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    responder('erro', ['mensagem' => 'Método não permitido'], 405);
}

$usuario_id = isset($_GET['usuario_id']) ? intval($_GET['usuario_id']) : null;

if (!$usuario_id || $usuario_id <= 0) {
    responder('erro', ['mensagem' => 'Parâmetro usuario_id inválido'], 400);
}

// Validar autenticação
if (empty($_SESSION['user']) || $_SESSION['user']['idUser'] != $usuario_id) {
    responder('erro', ['mensagem' => 'Não autorizado'], 401);
}

try {
    // ============================================================
    // 1. PAINEL DO JOGADOR
    // ============================================================
    
    $stmt = $pdo->prepare('
        SELECT 
            u.userName,
            u.idUser,
            COALESCE(us.pontuacao, 0) as pontuacao_total,
            COALESCE(us.total_partidas, 0) as total_partidas,
            COALESCE(us.total_vitorias, 0) as total_vitorias,
            COALESCE(us.total_derrotas, 0) as total_derrotas,
            COALESCE(us.maior_streak, 0) as maior_streak,
            COALESCE(us.dinheiro_total_acumulado, 0) as dinheiro_total,
            COALESCE(us.dinheiro_total_gasto, 0) as dinheiro_gasto,
            COALESCE(us.lixoTotal, 0) as lixo_reciclado,
            COALESCE(us.cartas_jogadas_total, 0) as cartas_jogadas,
            COALESCE(us.conquistasDesbloqueadas, 0) as conquistas_desbloqueadas,
            IFNULL(us.nivel, 1) as nivel,
            us.ultimoLogin
        FROM user u
        LEFT JOIN userStatus us ON u.idUser = us.idUser
        WHERE u.idUser = :usuario_id
    ');
    
    $stmt->execute([':usuario_id' => $usuario_id]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$usuario) {
        responder('erro', ['mensagem' => 'Usuário não encontrado'], 404);
    }
    
    // Calcular win rate
    $total_partidas = intval($usuario['total_partidas']);
    $win_rate = $total_partidas > 0 
        ? round((intval($usuario['total_vitorias']) / $total_partidas) * 100, 2)
        : 0;
    
    $painel_jogador = [
        'nome' => $usuario['userName'],
        'usuario_id' => $usuario['idUser'],
        'nivel' => intval($usuario['nivel']),
        'pontuacao_total' => intval($usuario['pontuacao_total']),
        'total_partidas' => $total_partidas,
        'total_vitorias' => intval($usuario['total_vitorias']),
        'total_derrotas' => intval($usuario['total_derrotas']),
        'win_rate_percentual' => $win_rate,
        'maior_streak' => intval($usuario['maior_streak']),
        'dinheiro_total_ganho' => intval($usuario['dinheiro_total']),
        'dinheiro_total_gasto' => intval($usuario['dinheiro_gasto']),
        'lixo_reciclado' => intval($usuario['lixo_reciclado']),
        'cartas_jogadas' => intval($usuario['cartas_jogadas']),
        'conquistas_desbloqueadas' => intval($usuario['conquistas_desbloqueadas']),
        'ultimo_login' => $usuario['ultimoLogin']
    ];
    
    // ============================================================
    // 2. HISTÓRICO DE PARTIDAS (10 últimas)
    // ============================================================
    
    $stmt = $pdo->prepare('
        SELECT 
            p.idPartida,
            p.resultado,
            p.pontuacao,
            p.duracao_segundos,
            p.data_hora,
            COALESCE(ep.cartas_jogadas, 0) as cartas_jogadas,
            COALESCE(ep.lixo_reciclado, 0) as lixo_reciclado,
            COALESCE(ep.dano_total, 0) as dano_total,
            COALESCE(ep.cura_total, 0) as cura_total
        FROM partidas p
        LEFT JOIN estatisticas_partida ep ON p.idPartida = ep.idPartida
        WHERE p.idUser = :usuario_id
        ORDER BY p.data_hora DESC
        LIMIT 10
    ');
    
    $stmt->execute([':usuario_id' => $usuario_id]);
    $partidas_brutas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $historico_partidas = [];
    foreach ($partidas_brutas as $partida) {
        $duracao = intval($partida['duracao_segundos']);
        $minutos = intval($duracao / 60);
        $segundos = $duracao % 60;
        
        $historico_partidas[] = [
            'id_partida' => intval($partida['idPartida']),
            'data_hora' => $partida['data_hora'],
            'resultado' => ucfirst($partida['resultado']),
            'resultado_tipo' => strtolower($partida['resultado']) === 'vitoria' ? 'vitoria' : 'derrota',
            'pontuacao' => intval($partida['pontuacao']),
            'duracao_segundos' => $duracao,
            'duracao_formatada' => sprintf('%d:%02d', $minutos, $segundos),
            'cartas_jogadas' => intval($partida['cartas_jogadas']),
            'lixo_reciclado' => intval($partida['lixo_reciclado']),
            'dano_total' => intval($partida['dano_total']),
            'cura_total' => intval($partida['cura_total'])
        ];
    }
    
    // ============================================================
    // 3. CONQUISTAS (COM STATUS)
    // ============================================================
    
    $stmt = $pdo->prepare('
        SELECT 
            c.idConquista,
            c.nome,
            c.descricao,
            c.categoria,
            c.personagem,
            CASE 
                WHEN cd.idDesbloqueio IS NOT NULL THEN 1 
                ELSE 0 
            END as desbloqueada,
            cd.dataDesbloqueio
        FROM conquistas c
        LEFT JOIN conquistas_desbloqueadas cd 
            ON c.idConquista = cd.idConquista 
            AND cd.idUser = :usuario_id
        ORDER BY c.idConquista
    ');
    
    $stmt->execute([':usuario_id' => $usuario_id]);
    $conquistas_brutas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $conquistas = [];
    $total_conquistas = 0;
    $total_desbloqueadas = 0;
    
    foreach ($conquistas_brutas as $conquista) {
        $desbloqueada = boolval($conquista['desbloqueada']);
        if ($desbloqueada) $total_desbloqueadas++;
        $total_conquistas++;
        
        $conquistas[] = [
            'id' => intval($conquista['idConquista']),
            'nome' => $conquista['nome'],
            'descricao' => $conquista['descricao'],
            'categoria' => $conquista['categoria'],
            'personagem' => $conquista['personagem'],
            'desbloqueada' => $desbloqueada,
            'data_desbloqueio' => $desbloqueada ? $conquista['dataDesbloqueio'] : null
        ];
    }
    
    $progresso_conquistas = $total_conquistas > 0 
        ? round(($total_desbloqueadas / $total_conquistas) * 100, 2)
        : 0;
    
    // ============================================================
    // 4. RANKING MUNDIAL (TOP 10)
    // ============================================================
    
    $stmt = $pdo->prepare('
        SELECT 
            u.idUser,
            u.userName,
            COALESCE(us.pontuacao, 0) as pontuacao_total,
            COALESCE(us.total_partidas, 0) as total_partidas,
            COALESCE(us.total_vitorias, 0) as total_vitorias,
            IFNULL(us.nivel, 1) as nivel
        FROM user u
        LEFT JOIN userStatus us ON u.idUser = us.idUser
        WHERE u.idUser != :usuario_id
        ORDER BY COALESCE(us.pontuacao, 0) DESC
        LIMIT 10
    ');
    
    $stmt->execute([':usuario_id' => $usuario_id]);
    $ranking_mundial_raw = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $ranking_mundial = [];
    $posicao = 1;
    foreach ($ranking_mundial_raw as $jogador) {
        $total_partidas = intval($jogador['total_partidas']);
        $win_rate = $total_partidas > 0 
            ? round((intval($jogador['total_vitorias']) / $total_partidas) * 100, 2)
            : 0;
        
        $ranking_mundial[] = [
            'posicao' => $posicao,
            'usuario_id' => intval($jogador['idUser']),
            'nome' => $jogador['userName'],
            'pontuacao' => intval($jogador['pontuacao_total']),
            'nivel' => intval($jogador['nivel']),
            'win_rate_percentual' => $win_rate,
            'total_partidas' => $total_partidas
        ];
        $posicao++;
    }
    
    // ============================================================
    // 5. RANKING PESSOAL (POSIÇÃO DO USUÁRIO)
    // ============================================================
    
    $stmt = $pdo->prepare('
        SELECT 
            COUNT(*) + 1 as posicao
        FROM userStatus us
        WHERE us.pontuacao > (
            SELECT COALESCE(us2.pontuacao, 0)
            FROM userStatus us2
            WHERE us2.idUser = :usuario_id
        )
    ');
    
    $stmt->execute([':usuario_id' => $usuario_id]);
    $ranking_pessoal = $stmt->fetch(PDO::FETCH_ASSOC);
    
    $posicao_pessoal = intval($ranking_pessoal['posicao']);
    
    // ============================================================
    // 6. MONTAR RESPOSTA FINAL
    // ============================================================
    
    responder('ok', [
        'jogador' => $painel_jogador,
        'historico_partidas' => $historico_partidas,
        'conquistas' => [
            'lista' => $conquistas,
            'total' => $total_conquistas,
            'desbloqueadas' => $total_desbloqueadas,
            'bloqueadas' => $total_conquistas - $total_desbloqueadas,
            'progresso_percentual' => $progresso_conquistas
        ],
        'ranking_mundial' => [
            'jogadores' => $ranking_mundial,
            'total' => count($ranking_mundial)
        ],
        'ranking_pessoal' => [
            'posicao' => $posicao_pessoal,
            'pontuacao' => intval($usuario['pontuacao_total'])
        ]
    ], 200);

} catch (PDOException $e) {
    error_log('Erro ao buscar dashboard: ' . $e->getMessage());
    responder('erro', ['mensagem' => 'Erro ao buscar dados do dashboard'], 500);
}

?>
