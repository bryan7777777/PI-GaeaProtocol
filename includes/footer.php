
<!-- Footer reutilizável para todas as páginas -->
<footer class="site-footer">
    <div class="footer-content">
        <div class="footer-section">
            <h4>Sobre Gaea Protocol</h4>
            <p>Um deckbuilder roguelike futurista com temática eco-punk.</p>
            <div class="social-links">
                <a href="#" title="GitHub">GH</a>
                <a href="#" title="Discord">DC</a>
                <a href="#" title="Twitter">TW</a>
            </div>
        </div>
        
        <div class="footer-section">
            <h4>Navegação</h4>
            <ul>
                <li><a href="/PI-GaeaProtocol/index.html">Início</a></li>
                <li><a href="/PI-GaeaProtocol/pages/tutorial.html">Tutorial</a></li>
                <li><a href="/PI-GaeaProtocol/pages/sobre.html">Sobre</a></li>
                <li><a href="/PI-GaeaProtocol/pages/login.html">Login</a></li>
            </ul>
        </div>
        
        <div class="footer-section">
            <h4>Jogabilidade</h4>
            <ul>
                <li><a href="/PI-GaeaProtocol/pages/telaDeInicioJogo.html">Jogar</a></li>
                <li><a href="/PI-GaeaProtocol/pages/conquistas.php">Conquistas</a></li>
                <li><a href="/PI-GaeaProtocol/pages/personagens.html">Personagens</a></li>
                <li><a href="/PI-GaeaProtocol/pages/protocolos.html">Protocolos</a></li>
            </ul>
        </div>
        
        <div class="footer-section">
            <h4>Legal</h4>
            <ul>
                <li><a href="#">Privacidade</a></li>
                <li><a href="#">Termos de Uso</a></li>
                <li><a href="#">Cookies</a></li>
                <li><a href="#">Contato</a></li>
            </ul>
        </div>
    </div>
    
    <div class="footer-bottom">
        <p>&copy; 2026 Gaea Protocol. Todos os direitos reservados.</p>
        <p class="version">v1.0.0 | Build 2026.04.17</p>
    </div>
</footer>

<style>
    .site-footer {
        background: rgba(10, 15, 30, 0.95);
        backdrop-filter: blur(10px);
        border-top: 1px solid rgba(0, 255, 136, 0.2);
        color: rgba(255, 255, 255, 0.7);
        padding: 3rem 1rem 1rem;
        margin-top: 3rem;
    }

    .footer-content {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
        margin-bottom: 2rem;
    }

    .footer-section h4 {
        color: #00ff88;
        margin-bottom: 1rem;
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .footer-section p {
        font-size: 0.9rem;
        line-height: 1.6;
        margin-bottom: 1rem;
    }

    .footer-section ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .footer-section li {
        margin-bottom: 0.5rem;
    }

    .footer-section a {
        color: rgba(255, 255, 255, 0.6);
        text-decoration: none;
        font-size: 0.9rem;
        transition: color 0.3s;
    }

    .footer-section a:hover {
        color: #00ff88;
        text-shadow: 0 0 5px rgba(0, 255, 136, 0.3);
    }

    .social-links {
        display: flex;
        gap: 0.75rem;
        margin-top: 1rem;
    }

    .social-links a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border: 1px solid #00ff88;
        border-radius: 4px;
        background: rgba(0, 255, 136, 0.1);
        font-size: 0.8rem;
        font-weight: bold;
        color: #00ff88;
    }

    .social-links a:hover {
        background: rgba(0, 255, 136, 0.2);
        box-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
    }

    .footer-bottom {
        max-width: 1200px;
        margin: 0 auto;
        padding-top: 1.5rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        text-align: center;
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.5);
    }

    .footer-bottom p {
        margin: 0.25rem 0;
    }

    .version {
        font-size: 0.8rem;
        color: rgba(255, 255, 255, 0.4);
    }

    @media (max-width: 768px) {
        .footer-content {
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
        }

        .footer-section h4 {
            font-size: 0.9rem;
        }
    }
</style>
