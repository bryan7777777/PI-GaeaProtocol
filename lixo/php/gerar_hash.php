<?php
/**
 * GERADOR DE HASH BCRYPT
 * Use este arquivo para gerar hashes de senhas
 * Acesse: http://localhost/PI-GaeaProtocol/php/gerar_hash.php
 */

echo "<h1>🔐 Gerador de Hash Bcrypt</h1>";
echo "<hr>";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $senha = $_POST['senha'] ?? '';
    
    if (empty($senha)) {
        echo "<p style='color: red;'>⚠️ Digite uma senha!</p>";
    } else {
        $hash = password_hash($senha, PASSWORD_BCRYPT, ['cost' => 12]);
        echo "<div style='background: #d4edda; padding: 15px; margin-top: 10px; border-radius: 4px;'>";
        echo "<h3>Senha: <code>$senha</code></h3>";
        echo "<h3>Hash:</h3>";
        echo "<code style='word-break: break-all; font-family: monospace;'>$hash</code>";
        echo "<p style='margin-top: 10px; color: #666;'>Use este hash ao inserir dados no banco de dados.</p>";
        echo "</div>";
    }
} else {
    // Mostrar hashes pré-gerados
    echo "<h2>Hashes Pré-gerados</h2>";
    echo "<p>Senha de teste: <strong>12345678</strong></p>";
    
    $hash = '$2y$12$KIXvMmqUKPxdfIYXUykvN...'; // Exemplo
    
    echo "<table border='1' style='margin-top: 10px; border-collapse: collapse;'>";
    echo "<tr><th>Usuário</th><th>Email</th><th>Senha</th><th>Hash</th></tr>";
    
    // Hash para '12345678'
    $senha_test = '12345678';
    $hash_test = password_hash($senha_test, PASSWORD_BCRYPT, ['cost' => 12]);
    
    echo "<tr>";
    echo "<td>test</td>";
    echo "<td>test@email.com</td>";
    echo "<td>12345678</td>";
    echo "<td><code style='font-size: 10px;'>$hash_test</code></td>";
    echo "</tr>";
    
    echo "</table>";
}

echo "<hr>";
echo "<h2>Calcular novo Hash</h2>";
echo "<form method='POST'>";
echo "<input type='password' name='senha' placeholder='Digite a senha' required>";
echo "<button type='submit'>Gerar Hash</button>";
echo "</form>";

echo "<style>
    html {
        font-family: Arial, sans-serif;
        padding: 20px;
        background: #f5f5f5;
    }
    body { margin: 0; }
    code {
        background: #f0f0f0;
        padding: 5px 8px;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
    }
    table td { padding: 10px; }
    table th { background: #333; color: white; padding: 10px; }
    button {
        padding: 8px 16px;
        background: #4caf50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
    }
    button:hover { background: #45a049; }
    input { padding: 8px; margin-right: 10px; border: 1px solid #ddd; border-radius: 4px; }
</style>";
?>
