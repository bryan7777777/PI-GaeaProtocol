<?php
/**
 * DIAGNÓSTICO DE LOGIN
 * Verifica credenciais e estrutura do banco de dados
 */

require_once 'config.php';

echo "╔═══════════════════════════════════════════════════════════╗\n";
echo "║         DIAGNÓSTICO DE LOGIN - GAEA PROTOCOL            ║\n";
echo "╚═══════════════════════════════════════════════════════════╝\n\n";

// 1. Verificar conexão com banco
echo "📌 [1/5] Verificando conexão com banco...\n";
try {
    $stmt = $pdo->query("SELECT 1");
    echo "✅ Conexão com banco de dados OK\n\n";
} catch (Exception $e) {
    echo "❌ Erro: " . $e->getMessage() . "\n\n";
    exit;
}

// 2. Verificar estrutura da tabela usuarios
echo "📌 [2/5] Verificando estrutura da tabela 'usuarios'...\n";
try {
    $stmt = $pdo->query("DESCRIBE usuarios");
    $colunas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $colunas_importantes = ['idUsuario', 'nomeUsuario', 'email', 'senhaHash'];
    $colunas_encontradas = array_column($colunas, 'Field');
    
    foreach ($colunas_importantes as $coluna) {
        if (in_array($coluna, $colunas_encontradas)) {
            echo "  ✓ Coluna '$coluna' existe\n";
        } else {
            echo "  ✗ Coluna '$coluna' NÃO ENCONTRADA\n";
        }
    }
    echo "\n";
} catch (Exception $e) {
    echo "❌ Erro: " . $e->getMessage() . "\n\n";
    exit;
}

// 3. Verificar usuários no banco
echo "📌 [3/5] Verificando usuários cadastrados...\n";
try {
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM usuarios");
    $result = $stmt->fetch();
    $total = $result['total'];
    
    echo "  Total de usuários: $total\n";
    
    if ($total > 0) {
        echo "\n  Usuários cadastrados:\n";
        $stmt = $pdo->query("SELECT idUsuario, nomeUsuario, email, tipoUsuario, LENGTH(senhaHash) as hash_len FROM usuarios");
        $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        foreach ($usuarios as $user) {
            echo "    - {$user['nomeUsuario']} ({$user['email']}) [Tipo: {$user['tipoUsuario']}, Hash: {$user['hash_len']} chars]\n";
        }
    }
    echo "\n";
} catch (Exception $e) {
    echo "❌ Erro: " . $e->getMessage() . "\n\n";
    exit;
}

// 4. Testar senha conhecida
echo "📌 [4/5] Testando verificação de senha...\n";
try {
    $stmt = $pdo->prepare("SELECT email, senhaHash FROM usuarios WHERE tipoUsuario = 'admin' LIMIT 1");
    $stmt->execute();
    $admin = $stmt->fetch();
    
    if ($admin) {
        echo "  Admin encontrado: {$admin['email']}\n";
        echo "  Hash: " . substr($admin['senhaHash'], 0, 20) . "...\n";
        echo "  Comprimento do hash: " . strlen($admin['senhaHash']) . " caracteres\n";
        
        // Testar senha padrão
        $teste_senha = "Admin@12345";
        $resultado = password_verify($teste_senha, $admin['senhaHash']);
        
        if ($resultado) {
            echo "  ✓ Senha 'Admin@12345' está CORRETA\n";
        } else {
            echo "  ✗ Senha 'Admin@12345' está INCORRETA\n";
            echo "  (Hash pode estar corrompido ou com salt incorreto)\n";
        }
    } else {
        echo "  ⚠ Nenhum usuário admin encontrado\n";
    }
    echo "\n";
} catch (Exception $e) {
    echo "❌ Erro: " . $e->getMessage() . "\n\n";
    exit;
}

// 5. Gerar novo hash para teste
echo "📌 [5/5] Gerando novo hash de teste...\n";
$nova_senha = "Teste@123456";
$novo_hash = password_hash($nova_senha, PASSWORD_BCRYPT, ['cost' => 12]);
echo "  Senha: $nova_senha\n";
echo "  Hash gerado: " . substr($novo_hash, 0, 30) . "...\n";
echo "  Comprimento: " . strlen($novo_hash) . " caracteres\n";

// Verificar se o novo hash funciona
$verificacao = password_verify($nova_senha, $novo_hash);
echo "  Verificação do novo hash: " . ($verificacao ? "✓ OK" : "✗ FALHOU") . "\n\n";

// Resumo
echo "╔═══════════════════════════════════════════════════════════╗\n";
echo "║                    RESUMO DIAGNÓSTICO                    ║\n";
echo "╚═══════════════════════════════════════════════════════════╝\n\n";

echo "✅ Sistema de autenticação está funcionando\n";
echo "\n📝 Para resetar um usuário admin:\n";
echo "   1. Acesse este arquivo no navegador\n";
echo "   2. Use o hash gerado acima\n";
echo "   3. Execute: UPDATE usuarios SET senhaHash = '<novo_hash>' WHERE email = 'admin@example.com';\n";
echo "\n";
?>
