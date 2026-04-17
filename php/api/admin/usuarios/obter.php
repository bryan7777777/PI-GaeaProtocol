<?php
/**
 * ============================================================================
 * OBTER UM USUÁRIO - Admin Only
 * ============================================================================
 * 
 * Endpoint: GET /php/api/admin/usuarios/obter.php
 * Query param: id (int) - ID do usuário
 * 
 * ============================================================================
 */

header('Content-Type: application/json');

require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/auth.php';

$usuario = verificar_admin();

// Validar ID
$idUsuario = intval($_GET['id'] ?? 0);
if ($idUsuario <= 0) {
    responder_erro('ID inválido');
    exit;
}

try {
    $query = "
        SELECT 
            idUsuario,
            nomeUsuario,
            emailUsuario,
            tipoUsuario,
            nivelJogador,
            pontuacaoTotal,
            totalPartidas,
            totalVitorias,
            totalDerrotas,
            (SELECT COUNT(*) FROM usuario_conquistas WHERE idUsuario = usuarios.idUsuario) as conquistasDesbloqueadas,
            dataCadastro,
            ultimoAcesso,
            usuarioAtivo
        FROM usuarios
        WHERE idUsuario = ?
    ";
    
    $stmt = $pdo->prepare($query);
    $stmt->execute([$idUsuario]);
    $usuarioData = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$usuarioData) {
        responder_erro('Usuário não encontrado');
        exit;
    }
    
    responder_ok($usuarioData, 'Usuário carregado');
    
} catch (Exception $e) {
    responder_erro('Erro ao carregar usuário: ' . $e->getMessage());
}

?>
