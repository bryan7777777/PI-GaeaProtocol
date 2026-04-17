<?php
/**
 * ============================================================
 * CONQUISTAS - Página
 * ============================================================
 * 
 * Exibe grid de conquistas com filtros e progresso
 * ============================================================
 */

// Iniciar sessão
session_start();

// Verificar autenticação
if (empty($_SESSION['usuario_id'])) {
    header('Location: /PI-GaeaProtocol/php/login.php');
    exit();
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Conquistas - Gaea Protocol</title>
    
    <!-- CSS Base -->
    <link rel="stylesheet" href="../css/reset.css">
    <link rel="stylesheet" href="../css/variables.css">
    <link rel="stylesheet" href="../css/global.css">
    <link rel="stylesheet" href="../css/dashboard.css">
    
    <!-- CSS da página -->
    <link rel="stylesheet" href="../css/conquistas.css">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body class="página-conquistas">
    <!-- CRIADO: Include header logado -->
    <?php include '../includes/header_logado.php'; ?>
    
    <main class="conquistas-container">
        <!-- Cabeçalho -->
        <section class="conquistas-header">
            <div class="header-content">
                <h1>🏆 Suas Conquistas</h1>
                <p id="contador" class="contador">Carregando...</p>
            </div>
        </section>
        
        <!-- Filtros -->
        <section class="filtros-section">
            <div class="filtro-buttons">
                <button class="filtro-btn ativo" data-filtro="todas">
                    <i class="fas fa-list"></i> Todas
                </button>
                <button class="filtro-btn" data-filtro="desbloqueadas">
                    <i class="fas fa-unlock"></i> Desbloqueadas
                </button>
                <button class="filtro-btn" data-filtro="bloqueadas">
                    <i class="fas fa-lock"></i> Bloqueadas
                </button>
            </div>
        </section>
        
        <!-- Grid de Conquistas -->
        <section class="conquistas-content">
            <div id="conquistas-grid" class="conquistas-grid">
                <div class="loading">
                    <i class="fas fa-spinner fa-spin"></i> Carregando conquistas...
                </div>
            </div>
        </section>
    </main>
    
    <!-- CRIADO: Include footer -->
    <?php include '../includes/footer.php'; ?>
    
    <!-- JavaScript -->
    <script src="../js/conquistas.js" defer></script>
</body>
</html>