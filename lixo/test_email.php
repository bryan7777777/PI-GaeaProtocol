<?php
require_once 'config.php';
require_once 'email_service.php';

// Teste de email
$result = send_email('teste@example.com', 'Teste Gaea Protocol', '<h1>Teste</h1><p>Email funcionando!</p>');
echo $result ? 'Email enviado com sucesso!' : 'Falha no envio';
?>