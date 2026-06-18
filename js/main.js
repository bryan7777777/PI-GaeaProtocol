/**
 * GAEA PROTOCOL - SCRIPT PRINCIPAL
 * =============================================================================
 * Funcionalidades:
 * - Autenticação (login/logout)
 * - Navegação entre seções
 * - Menu responsivo (hamburger)
 * - Inicialização de efeitos visuais
 * =============================================================================
 */

// =============================================================================
// CONSTANTES E CONFIGURAÇÃO
// =============================================================================

// Detectar base path para API
const API_BASE = window.location.pathname.includes('/PI-GaeaProtocol/') 
  ? '/PI-GaeaProtocol/php'
  : '/PI-GaeaProtocol/php'; // Fallback para /PI-GaeaProtocol/php

const STORAGE_KEY = 'gaea_user';

// =============================================================================
// UTILIDADES
// =============================================================================

/**
 * Fetch com tratamento de erro padrão
 */
async function fetchAPI(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: { 'Content-Type': 'application/json', ...options.headers },
            ...options
        });
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        return null;
    }
}

/**
 * Mostrar notificação temporária
 */
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        border-radius: 8px;
        font-weight:600;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), duration);
}

/**
 * Navegar entre seções
 */
function navigateTo(sectionId) {
    // Esconder todas as seções
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar seção solicitada
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
        window.history.pushState(null, '', `#${sectionId}`);
    }
    
    // Fechar menu mobile se aberto
    const hamburger = document.getElementById('hamburgerBtn');
    const nav = document.querySelector('.header-nav');
    if (hamburger && nav) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    }
}

// =============================================================================
// AUTENTICAÇÃO
// =============================================================================

/**
 * Verificar se usuário está autenticado
 */
async function checkAuthentication() {
    const response = await fetchAPI(`${API_BASE}/User/checkAuth.php`);
    
    if (response && response.authenticated) {
        return response.user;
    }
    return null;
}

/**
 * Atualizar UI com base no estado de autenticação
 */
async function updateAuthUI() {
    const user = await checkAuthentication();
    const authGuest = document.getElementById('authGuest');
    const authUser = document.getElementById('authUser');
    const userName = document.getElementById('userName');
    
    if (!authGuest || !authUser) return;
    
    if (user) {
        authGuest.style.display = 'none';
        authUser.style.display = 'flex';
        if (userName) {
            userName.textContent = `Olá, ${user.nome || 'Usuário'}!`;
        }
    } else {
        authGuest.style.display = 'flex';
        authUser.style.display = 'none';
    }
}

/**
 * Logout do usuário
 */
async function logoutUser() {
    if (!confirm('Deseja realmente sair?')) return;
    
    window.location.href = `${API_BASE}/User/logout.php`;
}

// =============================================================================
// MENU RESPONSIVO
// =============================================================================

/**
 * Inicializar menu hambúrguer
 */
function initHamburger() {
    const hamburger = document.getElementById('hamburgerBtn');
    const nav = document.querySelector('.header-nav');
    
    if (!hamburger || !nav) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });
}

// =============================================================================
// NAVEGAÇÃO E ROTEAMENTO
// =============================================================================

/**
 * Inicializar navegação com hash
 */
function initNavigation() {
    const hash = window.location.hash.slice(1) || 'home';
    
    // Verificar se seção existe
    const section = document.getElementById(hash);
    if (section) {
        navigateTo(hash);
    } else {
        navigateTo('home');
    }
    
    // Listener para mudança de URL
    window.addEventListener('hashchange', () => {
        const newHash = window.location.hash.slice(1) || 'home';
        const section = document.getElementById(newHash);
        if (section) {
            navigateTo(newHash);
        }
    });
}

// =============================================================================
// EFEITOS VISUAIS
// =============================================================================

/**
 * Inicializar partículas no fundo
 */
function initParticles() {
    const container = document.getElementById('particlesContainer');
    if (!container) return;
    
    const particleCount = window.innerWidth > 768 ? 50 : 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(76, 175, 80, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 3 + 3}s infinite;
        `;
        container.appendChild(particle);
    }
}

/**
 * Inicializar animações de linhas de energia
 */
function initEnergyLines() {
    const container = document.getElementById('energyLinesContainer');
    if (!container) return;
    
    const lines = 3;
    for (let i = 0; i < lines; i++) {
        const line = document.createElement('div');
        line.style.cssText = `
            position: absolute;
            height: 2px;
            background: linear-gradient(to right, transparent, rgba(76, 175, 80, 0.5), transparent);
            width: 300px;
            left: 0;
            top: ${(i + 1) * 25}%;
            animation: moveRight ${Math.random() * 5 + 10}s linear infinite;
        `;
        container.appendChild(line);
    }
}

/**
 * CSS para animações adicionadas dinamicamente
 */
function injectDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes moveRight {
            0% { transform: translateX(-400px); }
            100% { transform: translateX(100vw); }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(0px) translateX(0px); }
            75% { transform: translateY(-10px) translateX(-10px); }
        }
    `;
    document.head.appendChild(style);
}

// =============================================================================
// INICIALIZAÇÃO GERAL
// =============================================================================

/**
 * Função principal de inicialização
 */
async function init() {
    console.log('🚀 Inicializando Gaea Protocol...');
    
    // Injetar estilos dinâmicos
    injectDynamicStyles();
    
    // Inicializar componentes
    initHamburger();
    initNavigation();
    initParticles();
    initEnergyLines();
    
    // Verificar autenticação
    await updateAuthUI();
    
    console.log('✅ Inicialização completa!');
}

// =============================================================================
// EVENT LISTENERS
// =============================================================================

document.addEventListener('DOMContentLoaded', init);

// Redimensionamento responsivo
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalcular layout se necessário
    }, 250);
});

// =============================================================================
// FIM DO SCRIPT
// =============================================================================
