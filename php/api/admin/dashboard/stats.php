<?php
/**
 * ============================================================================
 * ESTATÍSTICAS DO DASHBOARD - Admin Only
 * ============================================================================
 * 
 * Endpoint: GET /php/api/admin/dashboard/stats.php
 * Retorna estatísticas gerais do sistema
 * 
 * ============================================================================
 */

header('Content-Type: application/json');

require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/auth.php';

$usuario = verificar_admin();

try {
    // Total de usuários
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM usuarios WHERE usuarioAtivo = 1");
    $totalUsuarios = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
    
    // Total de partidas
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM partidas");
    $totalPartidas = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
    
    // Taxa de vitória
    $stmt = $pdo->query("
        SELECT 
            ROUND(
                (SUM(CASE WHEN resultadoPartida = 'Vitoria' THEN 1 ELSE 0 END) * 100.0) / COUNT(*), 
                2
            ) as taxa
        FROM partidas
    ");
    $taxaVitoria = $stmt->fetch(PDO::FETCH_ASSOC)['taxa'] ?? 0;
    
    // Conquistas desbloqueadas
    $stmt = $pdo->query("SELECT COUNT(DISTINCT idUsuarioConquista) as count FROM usuario_conquistas");
    $conquistasDesbloqueadas = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
    
    // Usuários online (últilo acesso nos últimos 5 minutos)
    $stmt = $pdo->query("
        SELECT COUNT(*) as count 
        FROM usuarios 
        WHERE usuarioAtivo = 1 
        AND ultimoAcesso > DATE_SUB(NOW(), INTERVAL 5 MINUTE)
    ");
    $usuariosOnline = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
    
    responder_ok([
        'totalUsuarios' => intval($totalUsuarios),
        'totalPartidas' => intval($totalPartidas),
        'taxaVitoria' => floatval($taxaVitoria),
        'conquistasDesbloqueadas' => intval($conquistasDesbloqueadas),
        'usuariosOnline' => intval($usuariosOnline),
        'timestamp' => date('Y-m-d H:i:s')
    ], 'Estatísticas carregadas');
    
} catch (Exception $e) {
    responder_erro('Erro ao carregar estatísticas: ' . $e->getMessage());
}

?>
