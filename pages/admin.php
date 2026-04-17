<?php
/**
 * ============================================================
 * ADMIN - PAINEL ADMINISTRATIVO
 * ============================================================
 * Arquivo: /pages/admin.php
 * 
 * Centro de controle do jogo com acesso a:
 *   - Gerenciamento de usuários
 *   - Histórico de partidas
 *   - Conquistas do jogo
 *   - Logs de auditoria
 *   - Estatísticas gerais
 * 
 * Requer: $_SESSION['perfil'] === 'admin'
 * ============================================================
 */

// Iniciar sessão segura
require_once __DIR__ . '/../php/config/auth.php';
start_secure_session();

// ✅ VALIDAÇÃO DE PERMISSÃO
if ($_SESSION['perfil'] !== 'admin' || !isset($_SESSION['usuario_id'])) {
    header('Location: /PI-GaeaProtocol/pages/dashboard.php');
    exit;
}

$usuario_id = $_SESSION['usuario_id'];
$usuario_nome = $_SESSION['nome_usuario'];
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🔐 Painel Admin - Gaea Protocol</title>
    
    <link rel="stylesheet" href="../css/reset.css">
    <link rel="stylesheet" href="../css/variables.css">
    <link rel="stylesheet" href="../css/global.css">
    <link rel="stylesheet" href="../css/dashboard.css">
    <link rel="stylesheet" href="../css/admin.css">
    <link rel="stylesheet" href="../css/utilities.css">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Megrim&display=swap">
</head>
<body>
    <!-- Header Logado -->
    <?php include '../includes/header_logado.php'; ?>
    
    <main>
        <div class="admin-container">
            <!-- Título -->
            <div class="admin-header">
                <h1>🔐 Painel Administrativo</h1>
                <p class="admin-subtitle">Bem-vindo, <strong><?php echo htmlspecialchars($usuario_nome); ?></strong></p>
            </div>
            
            <!-- Menu de Navegação -->
            <nav class="admin-nav">
                <button class="admin-nav-btn active" data-section="dashboard">
                    <i class="fas fa-chart-line"></i> Dashboard
                </button>
                <button class="admin-nav-btn" data-section="usuarios">
                    <i class="fas fa-users"></i> Usuários
                </button>
                <button class="admin-nav-btn" data-section="partidas">
                    <i class="fas fa-gamepad"></i> Partidas
                </button>
                <button class="admin-nav-btn" data-section="conquistas">
                    <i class="fas fa-trophy"></i> Conquistas
                </button>
                <button class="admin-nav-btn" data-section="logs">
                    <i class="fas fa-list"></i> Logs
                </button>
            </nav>
            
            <!-- Conteúdo Dinâmico -->
            <div class="admin-content">
                <!-- Dashboard Section -->
                <section id="dashboard" class="admin-section active">
                    <h2>📊 Dashboard Geral</h2>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-icon">👥</div>
                            <div class="stat-label">Total de Usuários</div>
                            <div class="stat-value" id="totalUsuarios">-</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">🎮</div>
                            <div class="stat-label">Total de Partidas</div>
                            <div class="stat-value" id="totalPartidas">-</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">🏆</div>
                            <div class="stat-label">Total de Conquistas</div>
                            <div class="stat-value" id="totalConquistas">-</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">📈</div>
                            <div class="stat-label">Taxa de Vitória Média</div>
                            <div class="stat-value" id="taxaVitoria">-</div>
                        </div>
                    </div>
                </section>
                
                <!-- Usuarios Section -->
                <section id="usuarios" class="admin-section">
                    <h2>👥 Gerenciamento de Usuários</h2>
                    <div class="admin-table-container">
                        <table class="admin-table" id="usuarios-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Perfil</th>
                                    <th>Data de Registro</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody id="usuarios-tbody">
                                <tr><td class="text-center" colspan="6">Carregando...</td></tr>
                            </tbody>
                        </table>
                    </div>
                </section>
                
                <!-- Partidas Section -->
                <section id="partidas" class="admin-section">
                    <h2>🎮 Histórico de Partidas</h2>
                    <div class="admin-table-container">
                        <table class="admin-table" id="partidas-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Usuário</th>
                                    <th>Resultado</th>
                                    <th>Pontuação</th>
                                    <th>Fase</th>
                                    <th>Data</th>
                                </tr>
                            </thead>
                            <tbody id="partidas-tbody">
                                <tr><td class="text-center" colspan="6">Carregando...</td></tr>
                            </tbody>
                        </table>
                    </div>
                </section>
                
                <!-- Conquistas Section -->
                <section id="conquistas" class="admin-section">
                    <h2>🏆 Gerenciamento de Conquistas</h2>
                    <div class="admin-table-container">
                        <table class="admin-table" id="conquistas-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Tipo</th>
                                    <th>Meta</th>
                                    <th>Pontos</th>
                                    <th>Desbloqueadas</th>
                                </tr>
                            </thead>
                            <tbody id="conquistas-tbody">
                                <tr><td class="text-center" colspan="6">Carregando...</td></tr>
                            </tbody>
                        </table>
                    </div>
                </section>
                
                <!-- Logs Section -->
                <section id="logs" class="admin-section">
                    <h2>📝 Logs de Auditoria</h2>
                    <div class="admin-table-container">
                        <table class="admin-table" id="logs-table">
                            <thead>
                                <tr>
                                    <th>Data/Hora</th>
                                    <th>Usuário</th>
                                    <th>Tipo de Evento</th>
                                    <th>Detalhes</th>
                                </tr>
                            </thead>
                            <tbody id="logs-tbody">
                                <tr><td class="text-center" colspan="4">Carregando...</td></tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    </main>
    
    <!-- Footer -->
    <?php include '../includes/footer.php'; ?>
    
    <!-- Scripts -->
    <script src="../js/admin.js" defer></script>
</body>
</html>
