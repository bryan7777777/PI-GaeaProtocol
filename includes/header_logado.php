
<!-- Header para páginas autenticadas (com logout) -->
<?php
// Garantir que sessão está iniciada
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Obter dados do usuário
$nomeUsuario = $_SESSION['nome_usuario'] ?? 'Jogador';
$avatar = $_SESSION['avatar'] ?? '/PI-GaeaProtocol/img/site/icons/default-avatar.png';
$perfil = $_SESSION['perfil'] ?? 'jogador';
?>

<header class="site-header-logged">
    <div class="header-container">
        <div class="header-logo">
            <a href="/PI-GaeaProtocol/pages/dashboard.php">
                <img src="/PI-GaeaProtocol/img/site/logo/Logo.png" alt="Gaea Protocol" class="logo-img">
                <span class="logo-text">GAEA PROTOCOL</span>
            </a>
        </div>
        
        <nav class="header-nav">
            <ul class="nav-links">
                <li><a href="/PI-GaeaProtocol/pages/dashboard.php" class="nav-link">Dashboard</a></li>
                <li><a href="/PI-GaeaProtocol/pages/telaDeInicioJogo.html" class="nav-link">Jogar</a></li>
                <li><a href="/PI-GaeaProtocol/pages/conquistas.php" class="nav-link">Conquistas</a></li>
                <li><a href="/PI-GaeaProtocol/pages/sobre.html" class="nav-link">Sobre</a></li>
                <?php if ($perfil === 'admin'): ?>
                    <li><a href="/PI-GaeaProtocol/pages/admin.php" class="nav-link admin-link">
                        <span class="badge">ADMIN</span> Painel
                    </a></li>
                <?php endif; ?>
            </ul>
        </nav>
        
        <div class="header-user">
            <div class="user-profile">
                <img src="<?= htmlspecialchars($avatar) ?>" alt="Avatar" class="user-avatar">
                <span class="user-name"><?= htmlspecialchars($nomeUsuario) ?></span>
            </div>
            
            <button class="user-menu-toggle" onclick="toggleUserMenu()" title="Menu do usuário">
                <i class="icon-menu">☰</i>
            </button>
            
            <div class="user-menu" id="userMenu">
                <a href="/PI-GaeaProtocol/pages/dashboard.php" class="user-menu-item">Meu Perfil</a>
                <a href="/PI-GaeaProtocol/pages/conquistas.php" class="user-menu-item">Minhas Conquistas</a>
                <hr>
                <a href="/PI-GaeaProtocol/php/logout.php" class="user-menu-item logout">Sair</a>
            </div>
        </div>
    </div>
</header>

<style>
    .site-header-logged {
        background: rgba(15, 20, 40, 0.95);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding: 1rem 0;
        position: sticky;
        top: 0;
        z-index: 1000;
    }

    .header-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2rem;
    }

    .header-logo a {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        text-decoration: none;
        color: #00ff88;
        font-weight: bold;
        font-size: 1.1rem;
        white-space: nowrap;
    }

    .logo-img {
        height: 40px;
        width: auto;
    }

    .logo-text {
        background: linear-gradient(135deg, #00ff88, #00ccff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        letter-spacing: 1px;
    }

    .header-nav {
        flex: 1;
    }

    .nav-links {
        list-style: none;
        display: flex;
        gap: 1.5rem;
        margin: 0;
        padding: 0;
        flex-wrap: wrap;
    }

    .nav-link {
        color: rgba(255, 255, 255, 0.7);
        text-decoration: none;
        transition: color 0.3s;
        font-size: 0.95rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .nav-link:hover {
        color: #00ff88;
        text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
    }

    .nav-link.admin-link {
        color: #ff6b00;
    }

    .nav-link.admin-link:hover {
        color: #ffaa00;
        text-shadow: 0 0 10px rgba(255, 170, 0, 0.5);
    }

    .badge {
        background: rgba(255, 107, 0, 0.2);
        border: 1px solid #ff6b00;
        padding: 0.2rem 0.5rem;
        border-radius: 3px;
        font-size: 0.75rem;
        font-weight: bold;
    }

    .header-user {
        display: flex;
        align-items: center;
        gap: 1rem;
        position: relative;
    }

    .user-profile {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        cursor: pointer;
    }

    .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid #00ff88;
        object-fit: cover;
    }

    .user-name {
        color: #00ff88;
        font-weight: bold;
        font-size: 0.9rem;
    }

    .user-menu-toggle {
        background: transparent;
        border: none;
        color: #00ff88;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0.5rem;
        transition: transform 0.3s;
    }

    .user-menu-toggle:hover {
        transform: rotate(90deg);
    }

    .user-menu {
        display: none;
        position: absolute;
        top: 100%;
        right: 0;
        background: rgba(15, 20, 40, 0.98);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 6px;
        margin-top: 0.5rem;
        min-width: 180px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        z-index: 2000;
    }

    .user-menu.active {
        display: block;
        animation: slideIn 0.3s ease;
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .user-menu-item {
        display: block;
        padding: 0.75rem 1rem;
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
        transition: all 0.3s;
        border-left: 3px solid transparent;
    }

    .user-menu-item:hover {
        background: rgba(0, 255, 136, 0.1);
        color: #00ff88;
        border-left-color: #00ff88;
    }

    .user-menu-item.logout:hover {
        background: rgba(255, 0, 0, 0.1);
        color: #ff4444;
        border-left-color: #ff4444;
    }

    .user-menu hr {
        border: none;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        margin: 0.5rem 0;
    }

    @media (max-width: 768px) {
        .header-nav {
            display: none;
        }
        
        .user-name {
            display: none;
        }
    }
</style>

<script>
    function toggleUserMenu() {
        const menu = document.getElementById('userMenu');
        menu.classList.toggle('active');
    }

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        const userHeader = event.target.closest('.header-user');
        if (!userHeader) {
            const menu = document.getElementById('userMenu');
            if (menu) menu.classList.remove('active');
        }
    });
</script>
