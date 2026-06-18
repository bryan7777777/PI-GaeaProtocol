<?php
/**
 * ============================================================================
 * TIMELINE DE CONQUISTAS - Endpoint Público
 * ============================================================================
 * 
 * Endpoint: GET /php/api/conquistas/timeline.php
 * Query params: idUsuario (opcional, default: usuário autenticado)
 * 
 * Retorna timeline de conquistas do usuário com datas e progressão
 * 
 * Resposta:
 * {
 *   "status": "ok",
 *   "dados": {
 *     "usuario": {...},
 *     "timeline": [
 *       {
 *         "idConquista": 1,
 *         "nomeConquista": "CAÇADOR",
 *         "descricaoConquista": "Derrote Boss Alfa",
 *         "categoriaConquista": "boss",
 *         "dataDesbloqueio": "2026-04-10T14:30:00",
 *         "diasAtrás": 3,
 *         "icone": "🗡️"
 *       }
 *     ],
 *     "estatisticas": {
 *       "totalConquistas": 5,
 *       "percentualProgresso": 18.52,
 *       "proximosObjectivos": [...]
 *     }
 *   }
 * }
 * 
 * ============================================================================
 */

header('Content-Type: application/json');

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/response.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/auth.php';

// Validar autenticação
$usuario = verificar_autenticacao();

// Se especificar idUsuario na query, permite (para admin)
$idUsuarioAlvo = intval($_GET['idUsuario'] ?? 0);
if ($idUsuarioAlvo <= 0) {
    $idUsuarioAlvo = $usuario['idUsuario'];
}

// Se não for admin e tentar ver outro usuário, nega
if ($idUsuarioAlvo != $usuario['idUsuario'] && $usuario['tipoUsuario'] !== 'admin') {
    responder_nao_autorizado('Você só pode ver sua própria timeline');
    exit;
}

try {
    // Obter dados do usuário
    $stmt = $pdo->prepare("
        SELECT 
            idUsuario,
            nomeUsuario,
            nivelJogador,
            pontuacaoTotal,
            (SELECT COUNT(*) FROM usuario_conquistas WHERE idUsuario = usuarios.idUsuario) as conquistasDesbloqueadas
        FROM usuarios
        WHERE idUsuario = ?
    ");
    $stmt->execute([$idUsuarioAlvo]);
    $usuarioData = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$usuarioData) {
        responder_erro('Usuário não encontrado');
        exit;
    }
    
    // Obter timeline de conquistas
    $stmt = $pdo->prepare("
        SELECT 
            c.idConquista,
            c.nomeConquista,
            c.descricaoConquista,
            c.categoriaConquista,
            c.iconeConquista,
            uc.dataDesbloqueioConquista,
            DATEDIFF(NOW(), uc.dataDesbloqueioConquista) as diasAtrás
        FROM usuario_conquistas uc
        JOIN conquistas c ON uc.idConquista = c.idConquista
        WHERE uc.idUsuario = ?
        ORDER BY uc.dataDesbloqueioConquista DESC
        LIMIT 50
    ");
    $stmt->execute([$idUsuarioAlvo]);
    $timeline = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Processar timeline
    $timelineProcessada = array_map(function($item) {
        return [
            'idConquista' => intval($item['idConquista']),
            'nomeConquista' => $item['nomeConquista'],
            'descricaoConquista' => $item['descricaoConquista'],
            'categoriaConquista' => $item['categoriaConquista'],
            'icone' => $item['iconeConquista'],
            'dataDesbloqueio' => $item['dataDesbloqueioConquista'],
            'diasAtrás' => intval($item['diasAtrás']),
            'tempoRelativo' => formatar_tempo_relativo($item['diasAtrás'])
        ];
    }, $timeline);
    
    // Obter próximos objetivos (conquistas não desbloqueadas)
    $stmt = $pdo->prepare("
        SELECT 
            idConquista,
            nomeConquista,
            descricaoConquista,
            categoriaConquista,
            iconeConquista,
            pontosBonusConquista
        FROM conquistas
        WHERE idConquista NOT IN (
            SELECT idConquista FROM usuario_conquistas WHERE idUsuario = ?
        )
        ORDER BY RAND()
        LIMIT 5
    ");
    $stmt->execute([$idUsuarioAlvo]);
    $proximosObjetivos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Estatísticas
    $percentual = ($usuarioData['conquistasDesbloqueadas'] / 27) * 100;
    
    $estatisticas = [
        'totalConquistas' => intval($usuarioData['conquistasDesbloqueadas']),
        'totalDisponiveis' => 27,
        'percentualProgresso' => round($percentual, 2),
        'proximosObjetivos' => array_map(function($item) {
            return [
                'idConquista' => intval($item['idConquista']),
                'nome' => $item['nomeConquista'],
                'descricao' => $item['descricaoConquista'],
                'categoria' => $item['categoriaConquista'],
                'icone' => $item['iconeConquista'],
                'pontos' => intval($item['pontosBonusConquista'])
            ];
        }, $proximosObjetivos)
    ];
    
    responder_ok([
        'usuario' => [
            'idUsuario' => intval($usuarioData['idUsuario']),
            'nome' => $usuarioData['nomeUsuario'],
            'nivel' => intval($usuarioData['nivelJogador']),
            'pontuacao' => intval($usuarioData['pontuacaoTotal'])
        ],
        'timeline' => $timelineProcessada,
        'estatisticas' => $estatisticas
    ], 'Timeline de conquistas carregada');
    
} catch (Exception $e) {
    responder_erro('Erro ao carregar timeline: ' . $e->getMessage());
}

/**
 * Formata dias para texto relativo (ex: "há 2 dias")
 */
function formatar_tempo_relativo($dias) {
    if ($dias == 0) return 'Hoje';
    if ($dias == 1) return 'Ontem';
    if ($dias < 7) return "Há {$dias} dias";
    if ($dias < 30) return 'Há ' . round($dias / 7) . ' semanas';
    if ($dias < 365) return 'Há ' . round($dias / 30) . ' meses';
    return 'Há ' . round($dias / 365) . ' anos';
}

?>
