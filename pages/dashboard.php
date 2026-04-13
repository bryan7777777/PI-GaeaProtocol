<?php
/**
 * ============================================================
 * DASHBOARD - PÁGINA PRINCIPAL
 * ============================================================
 * Arquivo: /pages/dashboard.php
 * 
 * Exibe o dashboard completo com:
 *   - Painel do jogador
 *   - Histórico de partidas
 *   - Conquistas
 *   - Ranking mundial
 *   - Ranking pessoal
 * 
 * Dados carregados via fetch de /php/api/dashboard.php
 * ============================================================
 */

session_start();

// Validar autenticação
if (empty($_SESSION['user'])) {
    header('Location: /index.html');
    exit;
}

// Incluir config
require_once(__DIR__ . '/../php/config.php');
require_once(__DIR__ . '/../php/authenticate.php');

$usuario_id = $_SESSION['user']['idUser'];
$usuario_nome = $_SESSION['user']['userName'];

?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Gaea Protocol</title>
    
    <link rel="stylesheet" href="/css/reset.css">
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/dashboard.css">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Megrim&display=swap">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body data-usuario-id="<?php echo $usuario_id; ?>">

    <!-- Background System -->
    <div class="background-system">
        <div class="background-base"></div>
        <div class="circuit-grid"></div>
        <div class="energy-lines" id="energyLinesContainer"></div>
        <div class="particles-container" id="particlesContainer"></div>
        <div class="scanner-effect"></div>
        <div class="distortion-layer"></div>
    </div>

    <!-- Overlay -->
    <div class="overlay" id="overlay"></div>

    <!-- Navigation -->
    <nav>
        <div class="nav-content">
            <div class="logo-text" onclick="window.location.href='/index.html'">GAEA PROTOCOL</div>

            <button class="hamburger" id="hamburger" onclick="toggleMobileMenu()">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <ul class="nav-links" id="navLinks">
                <li><a href="/index.html">Início</a></li>
                <li><a href="/pages/dashboard.php">Dashboard</a></li>
                <li><a href="/pages/telaDeInicioJogo.html">Jogar</a></li>
            </ul>

            <div class="auth-section">
                <div id="authUser" class="auth-user">
                    <span id="userName"><?php echo $usuario_nome; ?></span>
                    <button onclick="logout()" class="logout-btn">Sair</button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Dashboard Container -->
    <div class="dashboard-container">
        
        <!-- Painel do Jogador -->
        <div id="painel-jogador" class="jogador-header">
            <div class="loading">Carregando dados do jogador...</div>
        </div>

        <!-- Stats Rápidas -->
        <div id="stats-cards" class="stats-4-grid" style="margin: 20px 0;">
            <div class="loading">Carregando estatísticas...</div>
        </div>

        <!-- Dashboard Grid -->
        <div class="dashboard-grid">
            
            <!-- Section: Histórico de Partidas -->
            <section class="dashboard-panel dashboard-full">
                <h2>📜 Histórico de Partidas</h2>
                <div id="historico-partidas">
                    <div class="loading">Carregando histórico...</div>
                </div>
            </section>

            <!-- Section: Conquistas -->
            <section class="dashboard-panel dashboard-full">
                <h2>🏆 Conquistas</h2>
                <div id="conquistas">
                    <div class="loading">Carregando conquistas...</div>
                </div>
            </section>

            <!-- Section: Ranking Pessoal -->
            <section class="dashboard-panel">
                <h2>🎖️ Sua Posição</h2>
                <div id="ranking-pessoal">
                    <div class="loading">Carregando ranking...</div>
                </div>
            </section>

            <!-- Section: Ranking Mundial -->
            <section class="dashboard-panel dashboard-full">
                <h2>🌍 Top 10 Mundial</h2>
                <div id="ranking-mundial">
                    <div class="loading">Carregando ranking...</div>
                </div>
            </section>

            <!-- Section: Estatísticas Acumuladas -->
            <section class="dashboard-panel dashboard-full">
                <h2>📊 Estatísticas Acumuladas</h2>
                <div id="stats-acumuladas">
                    <div class="loading">Carregando estatísticas...</div>
                </div>
            </section>

        </div>

    </div>

    <!-- Scripts -->
    <script src="/js/script.js"></script>
    <script src="/js/dashboard.js"></script>

    <!-- Script de logout -->
    <script>
        function logout() {
            fetch('/php/User/logout.php', { 
                method: 'POST',
                credentials: 'include'
            })
            .then(() => {
                window.location.href = '/index.html';
            });
        }

        function toggleMobileMenu() {
            const navLinks = document.getElementById('navLinks');
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        }
    </script>

</body>
</html>
