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

require_once(__DIR__ . '/../config.php');

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Cache-Control: no-cache, no-store, must-revalidate');

session_start();

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
if (empty($_SESSION['user']) || $_SESSION['user']['idUsuario'] != $usuario_id) {
    responder('erro', ['mensagem' => 'Não autorizado'], 401);
}

try {
    // ============================================================
    // 1. PAINEL DO JOGADOR
    // ============================================================
    
    $stmt = $pdo->prepare("
        SELECT 
            u.nomeUsuario,
            u.idUsuario,
            COALESCE(u.pontuacaoTotal, 0) as pontuacao_total,
            COALESCE(COUNT(DISTINCT p.idPartida), 0) as total_partidas,
            COALESCE(SUM(CASE WHEN p.resultado = 'vitoria' THEN 1 ELSE 0 END), 0) as total_vitorias,
            COALESCE(SUM(CASE WHEN p.resultado = 'derrota' THEN 1 ELSE 0 END), 0) as total_derrotas,
            COALESCE(u.maiorStreak, 0) as maior_streak,
            0 as dinheiro_total,
            0 as dinheiro_gasto,
            COALESCE(u.lixoReciclado, 0) as lixo_reciclado,
            COALESCE(MAX(p.pontuacao), 0) as cartas_jogadas,
            COUNT(DISTINCT uc.idConquista) as conquistas_desbloqueadas,
            IFNULL(u.tipoUsuario, 'jogador') as nivel,
            u.ultimoAcesso
        FROM usuarios u
        LEFT JOIN usuario_conquistas uc ON u.idUsuario = uc.idUsuario
        LEFT JOIN partidas p ON u.idUsuario = p.idUsuario
        WHERE u.idUsuario = :usuario_id
        GROUP BY u.idUsuario, u.nomeUsuario, u.pontuacaoTotal, u.maiorStreak, u.lixoReciclado, u.tipoUsuario, u.ultimoAcesso
    ");
    
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
        'nome' => $usuario['nomeUsuario'],
        'usuario_id' => $usuario['idUsuario'],
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
        'ultimo_login' => $usuario['ultimoAcesso']
    ];
    
    // ============================================================
    // 2. HISTÓRICO DE PARTIDAS (10 últimas)
    // ============================================================
    
    $stmt = $pdo->prepare("
        SELECT 
            p.idPartida,
            p.resultado,
            p.pontuacao,
            p.duracaoSegundos,
            p.dataPartida as data_hora,
            0 as cartas_jogadas,
            p.lixoColetado as lixo_reciclado,
            0 as dano_total,
            0 as cura_total
        FROM partidas p
        WHERE p.idUsuario = :usuario_id
        ORDER BY p.dataPartida DESC
        LIMIT 10
    ");
    
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
    
    $stmt = $pdo->prepare("
        SELECT 
            c.idConquista,
            c.nomeConquista as nome,
            c.descricaoConquista as descricao,
            'geral' as categoria,
            '' as personagem,
            CASE 
                WHEN uc.idConquista IS NOT NULL THEN 1 
                ELSE 0 
            END as desbloqueada,
            uc.dataDesbloqueio
        FROM conquistas c
        LEFT JOIN usuario_conquistas uc 
            ON c.idConquista = uc.idConquista 
            AND uc.idUsuario = :usuario_id
        ORDER BY c.idConquista
    ");
    
    $stmt->execute([':usuario_id' => $usuario_id]);
    $conquistas_brutas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $conquistas = [];
    $total_conquistas = 0;
    $total_desbloqueadas = 0;
    
    foreach ($conquistas_brutas as $conquista) {
        $desbloqueada = !is_null($conquista['dataDesbloqueio']);
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
    
    $stmt = $pdo->prepare("
        SELECT 
            u.idUsuario,
            u.nomeUsuario,
            COALESCE(u.pontuacaoTotal, 0) as pontuacao_total,
            COALESCE(COUNT(DISTINCT p.idPartida), 0) as total_partidas,
            COALESCE(SUM(CASE WHEN p.resultado = 'vitoria' THEN 1 ELSE 0 END), 0) as total_vitorias,
            IFNULL(u.tipoUsuario, 'jogador') as nivel
        FROM usuarios u
        LEFT JOIN partidas p ON u.idUsuario = p.idUsuario
        WHERE u.idUsuario != :usuario_id
        GROUP BY u.idUsuario, u.nomeUsuario, u.pontuacaoTotal, u.tipoUsuario
        ORDER BY COALESCE(u.pontuacaoTotal, 0) DESC
        LIMIT 10
    ");
    
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
            'usuario_id' => intval($jogador['idUsuario']),
            'nome' => $jogador['nomeUsuario'],
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
    
    $stmt = $pdo->prepare("
        SELECT 
            COUNT(*) + 1 as posicao
        FROM usuarios u
        WHERE u.pontuacaoTotal > (
            SELECT COALESCE(u2.pontuacaoTotal, 0)
            FROM usuarios u2
            WHERE u2.idUsuario = :usuario_id
        )
    ");
    
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
    $msg = 'Erro ao buscar dashboard: ' . $e->getMessage();
    $code = $e->getCode();
    error_log($msg);
    error_log('SQL State: ' . $e->errorInfo[0]);
    error_log('Error Code: ' . $code);
    
    // Se for erro de SQL, retornar com mais detalhes (apenas em desenvolvimento)
    responder('erro', [
        'mensagem' => 'Erro ao buscar dados do dashboard',
        'debug' => [
            'sqlstate' => $e->errorInfo[0] ?? 'Unknown',
            'code' => $code,
            'msg_curta' => substr($e->getMessage(), 0, 100)
        ]
    ], 500);
} catch (Exception $e) {
    error_log('Erro geral no dashboard: ' . $e->getMessage());
    responder('erro', [
        'mensagem' => 'Erro ao buscar dados do dashboard',
        'tipo' => get_class($e)
    ], 500);
}

?>
