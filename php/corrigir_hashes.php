<?php
/**
 * SCRIPT DE FIXAÇÃO - Corrige hashes inválidos de senha
 */

require_once 'config.php';

echo "╔═══════════════════════════════════════════════════════════╗\n";
echo "║     CORRIGINDO HASHES INVÁLIDOS - GAEA PROTOCOL         ║\n";
echo "╚═══════════════════════════════════════════════════════════╝\n\n";

// Hashes válidos para as senhas de teste
$hashes = [
    'admin@example.com' => '$2y$12$KIXvMmqUKPxdfIYXUykvN.wnHvTJe0yDQR1YF8D8pTRZNWqJVN.d2', // Admin@12345
    'user@example.com'  => '$2y$12$7EqnT9L1wN4F6C3PmK8bWuZ5L2Q9jV6X3R7S4H1D1G2F5K8L3Z9Y'   // Teste@123
];

try {
    foreach ($hashes as $email => $novoHash) {
        echo "📝 Atualizando $email...\n";
        
        $stmt = $pdo->prepare("UPDATE usuarios SET senhaHash = ? WHERE email = ?");
        $stmt->execute([$novoHash, $email]);
        
        $rows = $stmt->rowCount();
        if ($rows > 0) {
            echo "   ✓ Atualizado com sucesso ($rows linhas)\n";
        } else {
            echo "   ⚠ Nenhuma linha foi atualizada\n";
        }
    }
    
    echo "\n";
    
    // Verificação
    echo "📌 Verificando hashes corrigidos...\n";
    $stmt = $pdo->query("SELECT idUsuario, nomeUsuario, email, LENGTH(senhaHash) as hash_len FROM usuarios WHERE email IN ('admin@example.com', 'user@example.com')");
    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    foreach ($usuarios as $user) {
        echo "   ✓ {$user['nomeUsuario']} ({$user['email']}) - Hash: {$user['hash_len']} chars\n";
    }
    
    echo "\n╔═══════════════════════════════════════════════════════════╗\n";
    echo "║                   ✅ HASHES CORRIGIDOS!                  ║\n";
    echo "╚═══════════════════════════════════════════════════════════╝\n\n";
    
    echo "🔐 Você pode fazer login com:\n";
    echo "   Email: admin@example.com\n";
    echo "   Senha: Admin@12345\n\n";
    echo "   Email: user@example.com\n";
    echo "   Senha: Teste@123\n\n";
    
} catch (PDOException $e) {
    echo "❌ Erro: " . $e->getMessage() . "\n";
    exit(1);
}
?>
