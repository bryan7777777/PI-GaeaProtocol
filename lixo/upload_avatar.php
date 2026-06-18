<?php
/**
 * API de Upload de Avatar do Usuário
 * Aceita POST com arquivo e salva no servidor
 * Também salva ícones padrão
 */

require_once 'config.php';
start_secure_session();

header('Content-Type: application/json');

// Verifica autenticação
if (empty($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Não autenticado']);
    exit;
}

$userId = $_SESSION['user']['id'];

// Se foi enviado um ícone padrão
if (!empty($_POST['default_icon'])) {
    $iconClass = htmlspecialchars($_POST['default_icon']);
    
    try {
        $stmt = $pdo->prepare("UPDATE user SET fotoPerfil = ? WHERE idUser = ?");
        $stmt->execute(["icon://" . $iconClass, $userId]);
        
        echo json_encode(['success' => true, 'message' => 'Ícone definido com sucesso']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro ao atualizar banco de dados']);
        error_log('Erro ao definir ícone: ' . $e->getMessage());
    }
    exit;
}

// Se foi enviado um arquivo de imagem
if (!isset($_FILES['avatar']) || $_FILES['avatar']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'Nenhum arquivo enviado ou erro no upload']);
    exit;
}

$file = $_FILES['avatar'];

// Validações
$allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
$maxFileSize = 5 * 1024 * 1024; // 5MB

if (!in_array($file['type'], $allowedTypes)) {
    http_response_code(400);
    echo json_encode(['error' => 'Tipo de arquivo não permitido. Use JPG, PNG, GIF ou WEBP']);
    exit;
}

if ($file['size'] > $maxFileSize) {
    http_response_code(400);
    echo json_encode(['error' => 'Arquivo muito grande. Máximo 5MB']);
    exit;
}

// Cria diretório se não existir
$uploadDir = __DIR__ . '/../uploads/avatars/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Gera nome único para o arquivo
$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
$fileName = 'avatar_' . $userId . '_' . time() . '.' . $ext;
$filePath = $uploadDir . $fileName;

// Move arquivo
if (!move_uploaded_file($file['tmp_name'], $filePath)) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao salvar arquivo']);
    exit;
}

// Salva caminho no banco
try {
    $relativePath = 'uploads/avatars/' . $fileName;
    
    // Lê o conteúdo do arquivo
    $imageData = file_get_contents($filePath);
    
    // Remove imagem anterior se existir
    $stmt = $pdo->prepare("UPDATE user SET fotoPerfil = ?, fotoPerfilBlob = ? WHERE idUser = ?");
    $stmt->execute([$relativePath, $imageData, $userId]);
    
    // Remove o arquivo do sistema de arquivos após salvar no banco
    unlink($filePath);
    
    // Atualiza sessão
    $_SESSION['user']['fotoPerfil'] = $relativePath;
    
    echo json_encode([
        'success' => true,
        'message' => 'Avatar atualizado com sucesso',
        'avatar' => $relativePath
    ]);
} catch (PDOException $e) {
    // Remove arquivo se banco falhar
    if (file_exists($filePath)) unlink($filePath);
    http_response_code(500);
    echo json_encode(['error' => 'Erro ao atualizar banco de dados']);
    error_log('Erro upload avatar: ' . $e->getMessage());
}
