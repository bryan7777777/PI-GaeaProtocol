<?php
// Teste rápido do checkAuth
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/response.php';

echo "PHP Error Log (last 20 lines):\n";
system('tail -20 ' . ini_get('error_log') . ' 2>/dev/null || echo "Log file not found"');

echo "\n\nTesting checkAuth:\n";
echo "GET request simulation:\n";

// Simular uma requisição GET sem sessão ativa
$_SERVER['REQUEST_METHOD'] = 'GET';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo "✗ Not a GET request\n";
    exit;
}

echo "✓ GET request detected\n";

// Iniciar sessão
start_secure_session();
echo "✓ Session started\n";

// Verificar autenticação
if (empty($_SESSION['user'])) {
    echo "✓ User not authenticated (expected when no session)\n";
    echo "Response: ";
    responder_nao_autenticado('Você precisa estar autenticado');
} else {
    echo "✓ User authenticated\n";
}
?>
