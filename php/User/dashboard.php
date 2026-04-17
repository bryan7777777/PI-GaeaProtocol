<?php
/**
 * Dashboard do Usuário - Versão Simplificada (v2.0)
 * 
 * Após login, o usuário é redirecionado para cá
 * Este arquivo agora é um simples POST-login redirect
 * O novo dashboard está em /pages/dashboard.php
 * 
 * Data: 2026-04-13
 * Mudança: Removido sistema de foto/avatar
 * Status: Compatibilidade com sistema legado
 */

require_once 'checkAuth.php';

// Obter dados do usuário da sessão
$userId = $_SESSION['user']['id'] ?? null;
$userName = $_SESSION['user']['nome'] ?? 'Usuário';

if (!$userId) {
    header('Location: login.php');
    exit;
}

// Redirecionar para o novo dashboard
header('Location: /PI-GaeaProtocol/pages/dashboard.php');
exit;
?>
