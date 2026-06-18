<?php
/**
 * Endpoint para servir avatar do usuário armazenado no banco
 */

require_once 'config.php';

$userId = $_GET['id'] ?? null;
if (!$userId || !is_numeric($userId)) {
    http_response_code(400);
    exit('ID inválido');
}

try {
    $stmt = $pdo->prepare("SELECT fotoPerfilBlob FROM user WHERE idUser = ?");
    $stmt->execute([$userId]);
    $row = $stmt->fetch();
    
    if (!$row || !$row['fotoPerfilBlob']) {
        http_response_code(404);
        exit('Avatar não encontrado');
    }
    
    // Detecta tipo MIME baseado no conteúdo (simples)
    $imageData = $row['fotoPerfilBlob'];
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mimeType = finfo_buffer($finfo, $imageData);
    finfo_close($finfo);
    
    header('Content-Type: ' . $mimeType);
    header('Cache-Control: max-age=3600'); // Cache por 1 hora
    echo $imageData;
} catch (PDOException $e) {
    http_response_code(500);
    exit('Erro interno');
}
?>