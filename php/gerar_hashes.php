<?php
/**
 * GERA NOVO HASH VÁLIDO para senha de teste
 */

// Senha de teste
$senhaAdmin = "Admin@12345";
$senhaUser = "Teste@123";

// Gerar hashes válidos
$hashAdmin = password_hash($senhaAdmin, PASSWORD_BCRYPT, ['cost' => 12]);
$hashUser = password_hash($senhaUser, PASSWORD_BCRYPT, ['cost' => 12]);

// Testar se funciona
$verificacao1 = password_verify($senhaAdmin, $hashAdmin);
$verificacao2 = password_verify($senhaUser, $hashUser);

echo "╔═══════════════════════════════════════════════════════════╗\n";
echo "║          GERADOR DE HASHES VÁLIDOS                       ║\n";
echo "╚═══════════════════════════════════════════════════════════╝\n\n";

echo "🔐 ADMIN\n";
echo "   Senha: $senhaAdmin\n";
echo "   Hash:  $hashAdmin\n";
echo "   Len:   " . strlen($hashAdmin) . " chars\n";
echo "   Verif: " . ($verificacao1 ? "✓" : "✗") . "\n\n";

echo "🔐 USER\n";
echo "   Senha: $senhaUser\n";
echo "   Hash:  $hashUser\n";
echo "   Len:   " . strlen($hashUser) . " chars\n";
echo "   Verif: " . ($verificacao2 ? "✓" : "✗") . "\n\n";

// Gerar comando SQL
echo "╔═══════════════════════════════════════════════════════════╗\n";
echo "║  SQL PARA EXECUTAR (copie e cole no MySQL)              ║\n";
echo "╚═══════════════════════════════════════════════════════════╝\n\n";

echo "UPDATE usuarios SET senhaHash = '$hashAdmin' WHERE email = 'admin@example.com';\n";
echo "UPDATE usuarios SET senhaHash = '$hashUser' WHERE email = 'user@example.com';\n\n";
?>
