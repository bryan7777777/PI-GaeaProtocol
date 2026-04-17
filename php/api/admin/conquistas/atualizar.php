<?php
/**
 * ============================================================================
 * ATUALIZAR/CRIAR CONQUISTA - Admin Only
 * ============================================================================
 * 
 * POST /php/api/admin/conquistas/atualizar.php
 * 
 * JSON:
 * {
 *   "idConquista": 1,
 *   "nomeConquista": "Nome",
 *   "descricaoConquista": "Desc",
 *   "categoriaConquista": "boss|reciclagem|..."
 * }
 * 
 * ============================================================================
 */

header('Content-Type: application/json');

require_once __DIR__ . '/../../config/config.php';
require_once __DIR__ . '/../../config/response.php';
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/auth.php';

validar_metodo_post();
$usuario = verificar_admin();
$input = ler_json_input();

$idConquista = intval($input['idConquista'] ?? 0);
$nome = trim($input['nomeConquista'] ?? '');
$descricao = trim($input['descricaoConquista'] ?? '');
$categoria = $input['categoriaConquista'] ?? '';

if (strlen($nome) < 3) {
    responder_erro('Nome deve ter pelo menos 3 caracteres');
    exit;
}

$categorias = ['boss', 'reciclagem', 'vida', 'escudo', 'sinergia'];
if (!in_array($categoria, $categorias)) {
    responder_erro('Categoria inválida');
    exit;
}

try {
    if ($idConquista > 0) {
        // Atualizar
        $stmt = $pdo->prepare("
            UPDATE conquistas 
            SET nomeConquista = ?, descricaoConquista = ?, categoriaConquista = ?
            WHERE idConquista = ?
        ");
        $stmt->execute([$nome, $descricao, $categoria, $idConquista]);
        
        responder_ok([], 'Conquista atualizada');
    } else {
        // Criar
        $stmt = $pdo->prepare("
            INSERT INTO conquistas (nomeConquista, descricaoConquista, categoriaConquista, nomPersonagemConquista)
            VALUES (?, ?, ?, 'Admin')
        ");
        $stmt->execute([$nome, $descricao, $categoria]);
        $idConquista = $pdo->lastInsertId();
        
        responder_ok(['idConquista' => $idConquista], 'Conquista criada');
    }
    
} catch (Exception $e) {
    responder_erro('Erro: ' . $e->getMessage());
}

?>
