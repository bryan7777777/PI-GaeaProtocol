<!-- IMPLEMENTADO: Arquitetura_Proposta.md → includes/header_publico.php -->
<!-- Header para páginas públicas (sem login) -->
<header class="site-header">
    <div class="header-container">
        <div class="header-logo">
            <a href="/PI-GaeaProtocol/index.html">
                <img src="/PI-GaeaProtocol/img/site/logo/Logo.png" alt="Gaea Protocol" class="logo-img">
                <span class="logo-text">GAEA PROTOCOL</span>
            </a>
        </div>
        
        <nav class="header-nav">
            <ul class="nav-links">
                <li><a href="/PI-GaeaProtocol/index.html" class="nav-link">Início</a></li>
                <li><a href="/PI-GaeaProtocol/pages/sobre.html" class="nav-link">Sobre</a></li>
                <li><a href="/PI-GaeaProtocol/pages/tutorial.html" class="nav-link">Tutorial</a></li>
            </ul>
        </nav>
        
        <div class="header-auth">
            <a href="/PI-GaeaProtocol/php/login.php" class="btn btn-login">Login</a>
            <a href="/PI-GaeaProtocol/php/index.php" class="btn btn-register">Registrar</a>
        </div>
    </div>
</header>

<style>
    .site-header {
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
    }

    .header-logo a {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        text-decoration: none;
        color: #00ff88;
        font-weight: bold;
        font-size: 1.1rem;
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
        margin: 0 2rem;
    }

    .nav-links {
        list-style: none;
        display: flex;
        gap: 2rem;
        margin: 0;
        padding: 0;
    }

    .nav-link {
        color: rgba(255, 255, 255, 0.7);
        text-decoration: none;
        transition: color 0.3s;
        font-size: 0.95rem;
    }

    .nav-link:hover {
        color: #00ff88;
        text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
    }

    .header-auth {
        display: flex;
        gap: 1rem;
    }

    .btn {
        padding: 0.5rem 1rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        text-decoration: none;
        font-size: 0.9rem;
        transition: all 0.3s;
        cursor: pointer;
    }

    .btn-login {
        color: #00ff88;
        border-color: #00ff88;
    }

    .btn-login:hover {
        background: rgba(0, 255, 136, 0.1);
        box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
    }

    .btn-register {
        background: rgba(0, 255, 136, 0.1);
        color: #00ff88;
        border-color: #00ff88;
    }

    .btn-register:hover {
        background: rgba(0, 255, 136, 0.2);
        box-shadow: 0 0 15px rgba(0, 255, 136, 0.4);
    }

    @media (max-width: 768px) {
        .header-nav {
            display: none;
        }
        
        .nav-links {
            flex-direction: column;
        }
    }
</style>
