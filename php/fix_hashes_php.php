<?php
require_once 'config.php';

$hashes = [
    'admin@example.com' => '$2y$12$HCuPiJHgBtNN2EI4wlbxJuFu2GEiPtES1/jNpHm6ENp3NWpIURJR6',
    'user@example.com'  => '$2y$12$H4zIPs8syH4DIRIkE1AxYO3xfRYOffD.yVE2mY9ZgBiHjdOscbHve'
];

echo "Atualizando hashes...\n";

foreach ($hashes as $email => $hash) {
    $stmt = $pdo->prepare("UPDATE usuarios SET senhaHash = ? WHERE email = ?");
    $result = $stmt->execute([$hash, $email]);
    
    if ($result) {
        echo "✓ $email atualizado\n";
    }
}

// Verificar
$stmt = $pdo->query("SELECT email, LENGTH(senhaHash) FROM usuarios WHERE email IN ('admin@example.com', 'user@example.com')");
echo "\nVerificação:\n";
foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $row) {
    echo "{$row['email']}: {$row['LENGTH(senhaHash)']} chars\n";
}
?>
