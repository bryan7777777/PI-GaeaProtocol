// Dados do painel lateral com informações sobre cada seção
const panelData = {
  sobre: {
    title: 'Sobre',
    content: 'Gaea Protocol é um deckbuilder roguelike tático que combina estratégia profunda com mecânicas acessíveis. Cada run é uma jornada única através de um mundo pós-apocalíptico, onde suas escolhas moldam não apenas seu deck, mas o destino do planeta.',
    page: 'sobre-page'
  },
  historia: {
    title: 'História',
    content: 'Em um futuro onde a Terra está à beira do colapso, duas IAs - GAEA e Abaddon - travam uma guerra pelo destino da humanidade. Como piloto, você deve navegar por este conflito, descobrindo segredos e tomando decisões que afetam o equilíbrio do poder.',
    page: 'historia-page'
  },
  protocool: {
    title: 'Protocool',
    content: 'Cinco Protocolos distintos, cada um com sua filosofia e estilo de jogo único. Do Protocolo Gleba com sua regeneração sustentável ao Protocolo Glacial com seu controle absoluto, escolha seu caminho para a restauração.',
    page: 'protocool-page'
  },
  gameplay: {
    title: 'Jogabilidade',
    content: 'Combine cartas estrategicamente, colete relíquias poderosas e enfrente desafios crescentes. Cada decisão importa, desde a construção do seu deck até as escolhas de rota no mapa procedural.',
    page: 'gameplay-page'
  },
  mundo: {
    title: 'O Mundo',
    content: 'Explore um planeta transformado pela guerra entre IAs. De florestas contaminadas a cidades em ruínas, cada bioma apresenta seus próprios desafios e oportunidades para restauração.',
    page: 'mundo-page'
  },
  personagens: {
    title: 'Personagens',
    content: 'Três pilotos únicos, cada um com seu próprio mecha e estilo de jogo. Escolha entre velocidade, poder bruto ou resistência inabalável para enfrentar as ameaças do mundo devastado.',
    page: 'personagens-page'
  }
};

/**
 * Inicializa o sistema de partículas do fundo
 * Cria partículas com posições e animações aleatórias
 */
function initParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;

  for (let i = 0; i < 60; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 20 + 's';
    p.style.animationDuration = (Math.random() * 15 + 15) + 's';
    particlesContainer.appendChild(p);
  }
}

/**
 * Abre o painel lateral com o conteúdo da seção selecionada
 * @param {string} section - Identificador da seção a ser exibida
 */
function openPanel(section) {
  const panel = document.getElementById('sidePanel');
  const overlay = document.getElementById('overlay');
  const content = document.getElementById('panelContent');
  const data = panelData[section];

  if (!data || !content) return;

  content.innerHTML = `
    <h2>${data.title}</h2>
    <p>${data.content}</p>
    <button class="panel-button" onclick="showPage('${data.page}')">Ver Página Completa</button>
  `;

  panel.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Fecha o painel lateral e remove o overlay
 */
function closePanel() {
  const panel = document.getElementById('sidePanel');
  const overlay = document.getElementById('overlay');
  if (panel) panel.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = 'auto';
}

/**
 * Navega para uma página específica do site
 * @param {string} pageId - Identificador da página de destino
 */
function showPage(pageId) {
  const pageName = pageId.replace('-page', '');
  loadPage(pageName);
  closePanel();
}

/**
 * Carrega uma página do site
 * Detecta automaticamente o caminho correto baseado na localização do arquivo
 * @param {string} pageName - Nome da página
 */
function loadPage(pageName) {
  // Determina o caminho correto baseado na página atual
  const isHomePage = window.location.pathname.includes('index.html') || window.location.pathname === '/';
  const pagesPath = isHomePage ? 'pages/' : '';
  
  fetch(`${pagesPath}${pageName}.html`)
    .then(response => {
      if (!response.ok) throw new Error('Página não encontrada');
      return response.text();
    })
    .then(html => {
      const main = document.querySelector('.main-content');
      if (main) {
        main.innerHTML = html;
        // ADDED: atualiza atributo para que o CSS trate main corretamente
        main.setAttribute('data-page', pageName);
        // Reinicializa partículas na nova página
        initParticles();
        // Configura listeners para a nova página
        setupEventListeners();
      }
      document.body.style.overflow = pageName === 'home' ? 'hidden' : 'auto';

      // Ajusta visibilidade do footer via classe "show"
      const footer = document.querySelector('.site-footer');
      if (footer) {
        footer.classList.toggle('show', pageName !== 'home');
      }

      window.scrollTo(0, 0);
    })
    .catch(error => console.error('Erro ao carregar página:', error));
}

/**
 * Volta para a página inicial
 */
function showHome() {
  // Se já está na página inicial, apenas scroll para o topo
  const isOnHome = document.getElementById('home') !== null;
  if (isOnHome) {
    window.scrollTo(0, 0);
  } else {
    // Se está em uma página filha, volta para o index
    window.location.href = '../index.html';
  }
}

/**
 * Configura os event listeners necessários
 * - Overlay para fechar o painel
 * - Observer para controle de scroll
 */
function setupEventListeners() {
  const overlay = document.getElementById('overlay');
  if (overlay) {
    overlay.removeEventListener('click', closePanel);
    overlay.addEventListener('click', closePanel);
  }

  const sidePanel = document.getElementById('sidePanel');
  if (sidePanel) {
    const observer = new MutationObserver(() => {
      document.body.style.overflow = sidePanel.classList.contains('active') ? 'hidden' : 'auto';
    });
    observer.observe(sidePanel, { attributes: true, attributeFilter: ['class'] });
  }
}

/**
 * Alterna o menu móvel (abre/fecha o hambúrguer)
 */
function toggleMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  
  if (hamburger && navLinks) {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  }
}

/**
 * Fecha o menu móvel quando um link é clicado
 */
function closeMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  
  if (hamburger && navLinks) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  }
}

// Inicialização do site quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  setupEventListeners();
  
  // Expõe funções necessárias globalmente
  window.openPanel = openPanel;
  window.closePanel = closePanel;
  window.showPage = showPage;
  window.showHome = showHome;
  window.toggleMobileMenu = toggleMobileMenu;
  window.closeMobileMenu = closeMobileMenu;
  
  // Fecha menu móvel quando clica em um link
  const navLinks = document.getElementById('navLinks');
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }
});




// Sistema de Partículas Avançado
function createAdvancedParticles() {
    const container = document.getElementById('particlesContainer');
    const particleCount = 80;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 1;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        
        // Tipos de partículas
        const types = ['main', 'secondary', 'tertiary', 'glow', 'trail'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        particle.className = `particle ${type}`;
        particle.style.left = `${left}%`;
        particle.style.top = `${top}%`;
        
        // Variáveis CSS para animação única
        particle.style.setProperty('--tx', `${(Math.random() - 0.5) * 200}px`);
        particle.style.setProperty('--ty', `${-Math.random() * 150 - 50}vh`);
        particle.style.animationDelay = `${Math.random() * 20}s`;
        particle.style.animationDuration = `${15 + Math.random() * 15}s`;
        
        container.appendChild(particle);
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    createAdvancedParticles();
});