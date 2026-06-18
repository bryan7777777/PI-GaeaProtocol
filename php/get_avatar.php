<?php
/**
 * Endpoint para servir avatar do usuário
 * Pode ser:
 * 1. Avatar predefinido (retorna HTML com ícone + cor)
 * 2. Avatar enviado (retorna blob BLOB armazenado)
 */

require_once 'config.php';

$userId = $_GET['id'] ?? null;
if (!$userId || !is_numeric($userId)) {
    http_response_code(400);
    exit('ID inválido');
}

try {
    $stmt = $pdo->prepare("SELECT Avatar FROM usuarios WHERE idUsuario = ? LIMIT 1");
    $stmt->execute([$userId]);
    $row = $stmt->fetch();
    
    if (!$row || !$row['Avatar']) {
        http_response_code(404);
        exit('Avatar não encontrado');
    }
    
    // Se é um avatar predefinido
    if (strpos($row['Avatar'], 'predefined://') === 0) {
        header('Content-Type: text/html; charset=utf-8');
        
        $avatarId = substr($row['Avatar'], 12);
        
        $avatares = [
            'avatar_1' => ['🛡️', '#ff6b6b'],
            'avatar_2' => ['✨', '#7c3aed'],
            'avatar_3' => ['🏹', '#f59e0b'],
            'avatar_4' => ['❤️', '#ec4899'],
            'avatar_5' => ['🎭', '#06b6d4'],
            'avatar_6' => ['🍃', '#10b981'],
            'avatar_7' => ['💀', '#64748b'],
            'avatar_8' => ['🎵', '#8b5cf6'],
            'avatar_9' => ['🔥', '#ef4444'],
            'avatar_10' => ['🧭', '#3b82f6'],
            'avatar_11' => ['🔧', '#f97316'],
            'avatar_12' => ['✝️', '#fbbf24']
        ];
        
        if (isset($avatares[$avatarId])) {
            [$emoji, $cor] = $avatares[$avatarId];
            echo '<div style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:' . $cor . ';border-radius:50%;font-size:24px;box-shadow:0 0 10px rgba(0,0,0,0.3);">' . $emoji . '</div>';
        } else {
            echo '<div style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:#9ca3af;border-radius:50%;font-size:24px;">👤</div>';
        }
        exit;
    }
    
    // Se é um ícone Font Awesome
    if (strpos($row['Avatar'], 'icon://') === 0) {
        header('Content-Type: text/html; charset=utf-8');
        
        $iconClass = substr($row['Avatar'], 7);
        echo '<i class="fas ' . htmlspecialchars($iconClass) . '" style="font-size:24px;color:#2caf50;"></i>';
        exit;
    }
    
    // Caso contrário, é uma imagem armazenada como caminho
    if ($row['Avatar'] && !strpos($row['Avatar'], '://')) {
        $filePath = $_SERVER['DOCUMENT_ROOT'] . '/' . $row['Avatar'];
        if (file_exists($filePath)) {
            $imageData = file_get_contents($filePath);
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mimeType = finfo_buffer($finfo, $imageData);
            finfo_close($finfo);
            
            header('Content-Type: ' . $mimeType);
            header('Cache-Control: max-age=3600');
            echo $imageData;
            exit;
        } else {
            header('Content-Type: text/html; charset=utf-8');
            echo '<div style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:#9ca3af;border-radius:50%;font-size:24px;">👤</div>';
            exit;
        }
    }
    
    // Se nenhuma opção funcionou
    http_response_code(404);
    echo '<div style="display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;background:#e5e7eb;border-radius:50%;font-size:24px;">❓</div>';
    
} catch (PDOException $e) {
    http_response_code(500);
    exit('Erro interno');
}
?>