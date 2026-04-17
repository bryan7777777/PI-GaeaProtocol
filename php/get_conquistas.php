<?php
/**
 * ============================================================
 * GET CONQUISTAS - API Endpoint
 * ============================================================
 * CRIADO: Prompt 4 - Página de Conquistas Completa
 * 
 * Retorna lista de conquistas do usuário com progresso
 * 
 * GET /php/get_conquistas.php
 * Response: {status: "ok", dados: [{...conquistas}]}
 * ============================================================
 */

header('Content-Type: application/json; charset=utf-8');
ob_start();

try {
    // Iniciar sessão
    session_start();
    
    // Verificar autenticação
    if (empty($_SESSION['usuario_id'])) {
        http_response_code(401);
        echo json_encode(['status' => 'erro', 'mensagem' => 'Não autenticado']);
        exit();
    }
    
    $userId = $_SESSION['usuario_id'];
    
    // Incluir conexão PDO
    require_once __DIR__ . '/config/db.php';
    require_once __DIR__ . '/config/response.php';
    
    // CRIADO: Query adaptar aos nomes reais do schema
    $stmt = $pdo->prepare("
        SELECT
            c.idConquista as id,
            c.nomeConquista as nome,
            c.descricaoConquista as descricao,
            c.iconeConquista as icone,
            c.metaConquista as meta_valor,
            c.tipoConquista as tipo,
            c.pontosBonusConquista as pontos,
            COALESCE(uc.progresso_atual, 0) as progresso_atual,
            COALESCE(uc.desbloqueada, 0) as desbloqueada,
            COALESCE(uc.dataDesbloqueio, NULL) as data_desbloqueio
        FROM conquistas c
        LEFT JOIN usuario_conquistas uc
            ON c.idConquista = uc.idConquista 
            AND uc.idUsuario = :userId
        ORDER BY uc.desbloqueada DESC, c.idConquista ASC
    ");
    
    $stmt->execute([':userId' => $userId]);
    $conquistas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Transformar para resposta
    $dados = array_map(function($conquista) {
        return [
            'id' => intval($conquista['id']),
            'nome' => $conquista['nome'],
            'descricao' => $conquista['descricao'],
            'icone' => $conquista['icone'] ?? '🏆',
            'meta_valor' => intval($conquista['meta_valor']),
            'tipo' => $conquista['tipo'] ?? 'custom',
            'pontos' => intval($conquista['pontos']),
            'progresso_atual' => intval($conquista['progresso_atual']),
            'desbloqueada' => intval($conquista['desbloqueada']),
            'percentual' => intval(min(100, ($conquista['progresso_atual'] / max(1, $conquista['meta_valor'])) * 100)),
            'data_desbloqueio' => $conquista['data_desbloqueio']
        ];
    }, $conquistas);
    
    ob_end_clean();
    responder_ok($dados, 'Conquistas carregadas com sucesso');
    
} catch (Exception $e) {
    ob_end_clean();
    http_response_code(500);
    responder_erro('erro_servidor', 'Erro ao carregar conquistas: ' . $e->getMessage());
}
?>
