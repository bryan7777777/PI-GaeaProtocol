/**
 * GAEA PROTOCOL - SCRIPT PRINCIPAL
 * Sistema de navegação SPA (Single Page Application) com painel lateral
 * e efeitos visuais avançados.
 * 
 * Arquivo: script.js
 * Autor: Equipe Gaea Protocol
 */

// ============================================================================
// 1. CONFIGURAÇÕES E DADOS DO SISTEMA
// ============================================================================

/**
 * Dados do painel lateral com informações sobre cada seção do site
 * Cada seção possui:
 * - title: Título da seção
 * - content: Descrição resumida
 * - page: ID da página completa correspondente
 */
const PANEL_DATA = {
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
 * Configurações do sistema de partículas
 * Define tipos e comportamentos das partículas no background
 */
const PARTICLE_CONFIG = {
  count: 80,                       // Número total de partículas
  types: ['main', 'secondary', 'tertiary', 'glow', 'trail', 'spark', 'orb', 'crystal'],
  animationDuration: {              // Duração das animações em segundos
    min: 10,
    max: 25
  },
  movementRange: {                  // Alcance do movimento das partículas
    x: 300,                         // Movimento horizontal máximo (px)
    y: 200                          // Movimento vertical máximo (vh)
  }
};

/**
 * Configurações do Intersection Observer
 * Para animações de entrada dos elementos na tela
 */
const OBSERVER_CONFIG = {
  threshold: 0.1,                   // 10% do elemento visível
  rootMargin: '0px 0px -50px 0px'   // Margem para trigger antecipado
};

// ============================================================================
// 2. SISTEMA DE EFEITOS VISUAIS
// ============================================================================

/**
 * Inicializa o sistema de partículas do background
 * Cria partículas com posições e animações aleatórias
 * 
 * Fluxo:
 * 1. Limpa partículas existentes
 * 2. Cria novas partículas com propriedades aleatórias
 * 3. Define animações CSS personalizadas
 * 4. Adiciona ao container
 */
function initParticles() {
  const particlesContainer = document.getElementById('particlesContainer');
  
  // Validação: Verifica se o container existe
  if (!particlesContainer) {
    console.warn('Container de partículas não encontrado');
    return;
  }

  // Limpar partículas existentes para evitar acúmulo
  particlesContainer.innerHTML = '';

  // Criar novas partículas
  for (let i = 0; i < PARTICLE_CONFIG.count; i++) {
    createParticle(particlesContainer, i);
  }
}

/**
 * Cria uma partícula individual com propriedades aleatórias
 * @param {HTMLElement} container - Container onde a partícula será adicionada
 * @param {number} index - Índice da partícula (para delays de animação)
 */
function createParticle(container, index) {
  const particle = document.createElement('div');
  const left = Math.random() * 100;  // Posição horizontal (%)
  const top = Math.random() * 100;   // Posição vertical (%)
  
  // Seleciona tipo aleatório da lista
  const type = PARTICLE_CONFIG.types[
    Math.floor(Math.random() * PARTICLE_CONFIG.types.length)
  ];

  // Configura classes CSS
  particle.className = `particle ${type}`;
  particle.style.left = `${left}%`;
  particle.style.top = `${top}%`;

  // Configura movimento aleatório
  configureParticleMovement(particle, type);
  
  // Configura temporização da animação
  configureParticleTiming(particle, index);
  
  // Adiciona ao container
  container.appendChild(particle);
}

/**
 * Configura o movimento da partícula com variáveis CSS
 * @param {HTMLElement} particle - Elemento da partícula
 * @param {string} type - Tipo da partícula
 */
function configureParticleMovement(particle, type) {
  // Movimento aleatório em X e Y
  const tx = (Math.random() - 0.5) * PARTICLE_CONFIG.movementRange.x;
  const ty = -Math.random() * (PARTICLE_CONFIG.movementRange.y / 2) - 50;

  // Define variáveis CSS para controle da animação
  particle.style.setProperty('--tx', `${tx}px`);
  particle.style.setProperty('--ty', `${ty}vh`);
  
  // Configurações específicas por tipo de partícula
  switch(type) {
    case 'glow':
      particle.style.setProperty('--max-opacity', '1');
      break;
    case 'orb':
      particle.style.setProperty('--start-scale', Math.random() * 0.5 + 0.5);
      particle.style.setProperty('--end-scale', Math.random() * 0.3 + 0.1);
      particle.style.setProperty('--rotation', `${Math.random() * 360}deg`);
      break;
    case 'crystal':
      particle.style.setProperty('--rotation', `${Math.random() * 720}deg`);
      break;
  }
}

/**
 * Configura a temporização da animação da partícula
 * @param {HTMLElement} particle - Elemento da partícula
 * @param {number} index - Índice para delay sequencial
 */
function configureParticleTiming(particle, index) {
  const delay = Math.random() * 20;  // Delay aleatório até 20 segundos
  const duration = PARTICLE_CONFIG.animationDuration.min + 
                  Math.random() * (PARTICLE_CONFIG.animationDuration.max - 
                                  PARTICLE_CONFIG.animationDuration.min);
  
  particle.style.animationDelay = `${delay}s`;
  particle.style.animationDuration = `${duration}s`;
}

/**
 * Inicializa as linhas de energia animadas no background
 * Cria 5 linhas horizontais com animações de deslocamento
 */
function initEnergyLines() {
  const energyLinesContainer = document.getElementById('energyLinesContainer');
  
  if (!energyLinesContainer) {
    console.warn('Container de linhas de energia não encontrado');
    return;
  }
  
  // Limpar linhas existentes
  energyLinesContainer.innerHTML = '';
  
  // Criar 5 linhas de energia com alturas diferentes
  for (let i = 0; i < 5; i++) {
    const line = document.createElement('div');
    line.className = 'energy-line';
    energyLinesContainer.appendChild(line);
  }
}

// ============================================================================
// 3. SISTEMA DE NAVEGAÇÃO E PAINEL LATERAL
// ============================================================================

/**
 * Abre o painel lateral com o conteúdo da seção selecionada
 * @param {string} section - Identificador da seção (chave em PANEL_DATA)
 * 
 * Fluxo:
 * 1. Obtém dados da seção
 * 2. Atualiza conteúdo do painel
 * 3. Exibe painel e overlay
 * 4. Bloqueia scroll da página
 */
function openPanel(section) {
  const panel = document.getElementById('sidePanel');
  const overlay = document.getElementById('overlay');
  const content = document.getElementById('panelContent');
  const data = PANEL_DATA[section];

  // Validação: Verifica se os elementos e dados existem
  if (!data || !content) {
    console.error(`Dados não encontrados para a seção: ${section}`);
    return;
  }

  // Monta conteúdo HTML do painel
  content.innerHTML = `
    <h2>${data.title}</h2>
    <p>${data.content}</p>
    <button class="panel-button" onclick="showPage('${data.page}')">
      Ver Página Completa
    </button>
  `;

  // Ativa painel e overlay
  panel.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Fecha o painel lateral e remove o overlay
 * Restaura o scroll da página
 */
function closePanel() {
  const panel = document.getElementById('sidePanel');
  const overlay = document.getElementById('overlay');
  
  if (panel) panel.classList.remove('active');
  if (overlay) overlay.classList.remove('active');
  
  document.body.style.overflow = 'auto';
}

/**
 * Navega para uma página específica do site e fecha o painel
 * @param {string} pageId - Identificador da página de destino
 */
function showPage(pageId) {
  const pageName = pageId.replace('-page', '');
  loadPage(pageName);
  closePanel();
}

/**
 * Volta para a página inicial (home)
 * 
 * Fluxo:
 * 1. Se já está na home, apenas faz scroll para o topo
 * 2. Se não, tenta carregar o index.html
 * 3. Fallback: redireciona para a URL do index
 */
function showHome() {
  const homeEl = document.getElementById('home');
  const main = document.querySelector('.main-content');
  const dataPage = main ? main.getAttribute('data-page') : null;
  
  // Se já está na home, apenas faz scroll para o topo
  if (homeEl || dataPage === 'home') {
    window.scrollTo(0, 0);
    return;
  }

  // Carrega a página inicial
  loadHomePage();
}

/**
 * Carrega dinamicamente a página inicial
 * @async
 */
async function loadHomePage() {
  // Detecta automaticamente o caminho base (para GitHub Pages)
  const base = getRepoBasePath();
  
  // Lista de caminhos possíveis para o index.html
  const candidates = [
    'index.html',
    './index.html',
    '../index.html',
    `${base}/index.html`,
    '/index.html'
  ];
  
  // Tenta cada caminho até encontrar um que funcione
  for (const path of candidates) {
    try {
      const success = await tryLoadPage(path);
      if (success) return;
    } catch (err) {
      continue; // Tenta próximo caminho
    }
  }
  
  // Fallback: redireciona se nenhum caminho funcionou
  window.location.href = `${base}/index.html`;
}

/**
 * Tenta carregar uma página pelo caminho especificado
 * @param {string} path - Caminho para o arquivo HTML
 * @returns {Promise<boolean>} - Sucesso ou falha
 */
async function tryLoadPage(path) {
  try {
    const resp = await fetch(path);
    if (!resp.ok) return false;
    
    const html = await resp.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const fetchedMain = doc.querySelector('.main-content') || 
                       doc.querySelector('#home') || 
                       doc.body;
    
    const main = document.querySelector('.main-content');
    if (!fetchedMain || !main) return false;
    
    // Atualiza conteúdo da página
    main.innerHTML = fetchedMain.innerHTML;
    main.setAttribute('data-page', 'home');
    
    // Reinicializa efeitos visuais
    reinitializePageEffects();
    
    // Configura estado da página inicial
    document.body.style.overflow = 'hidden';
    const footer = document.querySelector('.site-footer');
    if (footer) {
      footer.classList.remove('show');
    }
    
    window.scrollTo(0, 0);
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Carrega uma página específica do site
 * @param {string} pageName - Nome da página (sem extensão)
 * 
 * Fluxo:
 * 1. Tenta vários caminhos possíveis
 * 2. Extrai apenas o conteúdo principal
 * 3. Atualiza a página atual
 * 4. Reinicializa efeitos e listeners
 */
async function loadPage(pageName) {
  // Lista de caminhos possíveis para o arquivo da página
  const tryPaths = [
    `pages/${pageName}.html`,
    `./pages/${pageName}.html`,
    `../pages/${pageName}.html`,
    `/pages/${pageName}.html`,
    `${pageName}.html`,
    `./${pageName}.html`
  ];

  let html = null;
  
  // Tenta cada caminho até encontrar um válido
  for (const path of tryPaths) {
    try {
      const resp = await fetch(path);
      if (resp.ok) {
        html = await resp.text();
        break;
      }
    } catch (e) {
      // Continua para o próximo caminho
    }
  }

  // Validação: Verifica se encontrou o HTML
  if (!html) {
    console.error('Não foi possível carregar a página. Caminhos tentados:', tryPaths);
    return;
  }

  // Processa o HTML carregado
  processLoadedPage(html, pageName);
}

/**
 * Processa o HTML carregado e atualiza a página
 * @param {string} html - Conteúdo HTML da página
 * @param {string} pageName - Nome da página
 */
function processLoadedPage(html, pageName) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // Extrai apenas o conteúdo principal (evita duplicar <html>, <body>)
  const fetchedMain = doc.querySelector('.main-content') || 
                     doc.querySelector('main') || 
                     doc.body;

  const main = document.querySelector('.main-content');
  if (!main) {
    console.error('Elemento .main-content não encontrado na página atual');
    return;
  }

  // Atualiza conteúdo da página
  main.innerHTML = fetchedMain ? fetchedMain.innerHTML : html;
  main.setAttribute('data-page', pageName);
  
  // Reinicializa efeitos visuais e listeners
  reinitializePageEffects();
  
  // Configura estado da página
  document.body.style.overflow = pageName === 'home' ? 'hidden' : 'auto';
  
  // Gerencia visibilidade do footer
  const footer = document.querySelector('.site-footer');
  if (footer) {
    footer.classList.toggle('show', pageName !== 'home');
  }

  window.scrollTo(0, 0);
}

/**
 * Reinicializa todos os efeitos visuais e configurações da página
 * Chamado sempre que uma nova página é carregada
 */
function reinitializePageEffects() {
  initParticles();
  initEnergyLines();
  setupEventListeners();
  setupIntersectionObserver();
  setupProtocolNavigation();
}

// ============================================================================
// 4. SISTEMA DE MENU MOBILE
// ============================================================================

/**
 * Alterna o estado do menu móvel (abre/fecha)
 * Controla tanto o ícone hambúrguer quanto a lista de navegação
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
 * Fecha o menu móvel
 * Usado quando um link é clicado no menu mobile
 */
function closeMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  }
}

// ============================================================================
// 4.5. SISTEMA DE NAVEGAÇÃO DE PROTOCOLOS
// ============================================================================

/**
 * Inicializa o sistema de navegação entre protocolos
 * Configura os botões para alternar entre diferentes seções de protocolo
 */
function setupProtocolNavigation() {
  const protocolButtons = document.querySelectorAll('.protocol-nav-btn');
  const protocolSections = document.querySelectorAll('.protocol-section');

  // Validação: Verifica se os elementos existem
  if (protocolButtons.length === 0 || protocolSections.length === 0) {
    return; // Não está em página de protocool
  }

  /**
   * Mostra uma seção específica de protocolo
   * @param {string} protocolId - ID do protocolo a exibir
   */
  function showProtocol(protocolId) {
    // Esconde todas as seções
    protocolSections.forEach(section => {
      section.style.display = 'none';
    });

    // Remove classe ativa de todos os botões
    protocolButtons.forEach(button => {
      button.classList.remove('active');
    });

    // Mostra a seção selecionada
    const targetSection = document.getElementById(`${protocolId}-protocol`);
    if (targetSection) {
      targetSection.style.display = 'block';

      // Adiciona animação de entrada
      targetSection.style.animation = 'fadeInUp 0.6s ease-out';

      // Scroll suave para a seção
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    // Ativa o botão correspondente
    const activeButton = document.querySelector(`.protocol-nav-btn[data-protocol="${protocolId}"]`);
    if (activeButton) {
      activeButton.classList.add('active');
    }
  }

  // Adiciona event listeners aos botões
  protocolButtons.forEach(button => {
    button.addEventListener('click', function() {
      const protocolId = this.getAttribute('data-protocol');
      showProtocol(protocolId);
    });
  });

  // Mostra o primeiro protocolo por padrão
  const firstProtocol = protocolButtons[0]?.getAttribute('data-protocol');
  if (firstProtocol) {
    showProtocol(firstProtocol);
  }
}

// ============================================================================
// 5. SISTEMA DE OBSERVAÇÃO E ANIMAÇÕES
// ============================================================================

/**
 * Configura o Intersection Observer para animações de entrada
 * Observa elementos e aplica animações quando entram na viewport
 */
function setupIntersectionObserver() {
  const intersectionObserver = new IntersectionObserver(
    handleIntersection,
    OBSERVER_CONFIG
  );

  // Seleciona elementos para observar
  const elementsToObserve = document.querySelectorAll(
    '.character, .protocol-card, .back-button'
  );

  // Configura cada elemento
  elementsToObserve.forEach(el => {
    // Estado inicial oculto
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    // Inicia observação
    intersectionObserver.observe(el);
  });
}

/**
 * Manipula as intersecções detectadas pelo Observer
 * @param {IntersectionObserverEntry[]} entries - Entradas observadas
 */
function handleIntersection(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Quando o elemento fica visível, aplica a animação
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}

// ============================================================================
// 6. CONFIGURAÇÃO DE EVENT LISTENERS
// ============================================================================

/**
 * Configura todos os event listeners necessários
 * - Overlay para fechar painel
 * - Observer para controle de scroll
 * - Menu mobile
 * - Navegação de protocolos
 */
function setupEventListeners() {
  setupOverlayListener();
  setupPanelObserver();
  setupMobileMenuListeners();
  setupProtocolNavigation();
}

/**
 * Configura listener para o overlay (fecha painel ao clicar)
 */
function setupOverlayListener() {
  const overlay = document.getElementById('overlay');

  if (overlay) {
    // Remove listener anterior para evitar duplicação
    overlay.removeEventListener('click', closePanel);
    // Adiciona novo listener
    overlay.addEventListener('click', closePanel);
  }
}

/**
 * Configura observer para o painel lateral
 * Controla overflow do body baseado no estado do painel
 */
function setupPanelObserver() {
  const sidePanel = document.getElementById('sidePanel');

  if (sidePanel) {
    const observer = new MutationObserver(() => {
      document.body.style.overflow = sidePanel.classList.contains('active')
        ? 'hidden'
        : 'auto';
    });

    observer.observe(sidePanel, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
}

/**
 * Configura listeners para o menu mobile
 * Fecha menu ao clicar em links
 */
function setupMobileMenuListeners() {
  const navLinks = document.getElementById('navLinks');

  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }
}

// ============================================================================
// 7. FUNÇÕES UTILITÁRIAS
// ============================================================================

/**
 * Obtém o caminho base do repositório (para GitHub Pages)
 * @returns {string} Caminho base ou string vazia
 */
function getRepoBasePath() {
  const path = window.location.pathname.split('/');
  
  // GitHub Pages geralmente tem estrutura: /reponame/
  if (path.length > 1 && path[1]) {
    return '/' + path[1];
  }
  
  return '';
}

// ============================================================================
// 8. INICIALIZAÇÃO DO SISTEMA
// ============================================================================

/**
 * Inicializa toda a aplicação quando o DOM estiver carregado
 * 
 * Fluxo de inicialização:
 * 1. Efeitos visuais (partículas e linhas de energia)
 * 2. Event listeners
 * 3. Menu mobile
 * 4. Intersection Observer para animações
 * 5. Exposição de funções globais
 */
function initializeApp() {
  // Inicializa efeitos visuais
  initParticles();
  initEnergyLines();
  
  // Configura listeners
  setupEventListeners();
  
  // Configura menu mobile
  setupMobileMenuListeners();
  
  // Configura animações de entrada
  setupIntersectionObserver();
  
  // Expõe funções necessárias globalmente
  exposeGlobalFunctions();
}

/**
 * Expõe funções necessárias no escopo global
 * Para acesso via atributos HTML (onclick, etc.)
 */
function exposeGlobalFunctions() {
  window.openPanel = openPanel;
  window.closePanel = closePanel;
  window.showPage = showPage;
  window.showHome = showHome;
  window.toggleMobileMenu = toggleMobileMenu;
  window.closeMobileMenu = closeMobileMenu;
  window.getRepoBasePath = getRepoBasePath;
}

// ============================================================================
// 9. EXECUÇÃO DA APLICAÇÃO
// ============================================================================

// Aguarda o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
  initializeAuthSystem();
});

// ============================================================================
// SISTEMA DE AUTENTICAÇÃO
// ============================================================================

/**
 * Inicializa o sistema de autenticação
 * Verifica se o usuário está logado e atualiza a UI
 */
function initializeAuthSystem() {
  // Detecta base path dinamicamente - versão melhorada
  let basePath = '';
  
  // Método 1: Detecta do URL da página - mais simples e confiável
  const pathname = window.location.pathname;
  console.log('[Auth] 1. Pathname:', pathname);
  
  if (pathname.includes('/PI-GaeaProtocol/')) {
    basePath = '/PI-GaeaProtocol';
    console.log('[Auth] 2a. Detectado via pathname');
  } else if (pathname.startsWith('/gaea')) {
    basePath = '/gaea';
    console.log('[Auth] 2b. Detectado como /gaea');
  }
  
  // Se ainda não detectou, tenta do script src
  if (!basePath) {
    console.log('[Auth] 3. Tentando detectar via script src...');
    const scripts = document.querySelectorAll('script[src]');
    console.log('[Auth] Scripts carregados:', scripts.length);
    for (const script of scripts) {
      console.log('[Auth]   - Script:', script.src);
      if (script.src.includes('/PI-GaeaProtocol/')) {
        basePath = '/PI-GaeaProtocol';
        console.log('[Auth] 4. Detectado via script src');
        break;
      }
    }
  }
  
  // Fallback: tentar /PI-GaeaProtocol se ainda estiver vazio
  if (!basePath) {
    basePath = '/PI-GaeaProtocol';
    console.log('[Auth] 5. Usando fallback: /PI-GaeaProtocol');
  }
  
  console.log('[Auth] 6. basePath final:', basePath);
  const checkAuthUrl = basePath + '/php/User/checkAuth.php';
  console.log('[Auth] 7. URL de autenticação:', checkAuthUrl);
  console.log('[Auth] 8. Fazendo fetch para:', checkAuthUrl);
  
  // Busca dados de sessão do servidor
  fetch(checkAuthUrl)
    .then(response => {
      console.log('[Auth] 9. Resposta recebida:', response.status, response.statusText);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('[Auth] 10. Dados JSON parseados:', data);
      if (data.authenticated && data.dados && data.dados.user) {
        const user = data.dados.user;
        console.log('[Auth] 11. Usuário autenticado:', user.nome || user.nomeUsuario);
        console.log('[Auth] 11b. Objeto user completo:', JSON.stringify(user));
        
        // Guardar userId no localStorage para uso no jogo
        // Testa os nomes de campo mais comuns retornados pelo PHP
        const userId = user.idUsuario ?? user.id ?? user.userId ?? user.user_id ?? user.ID ?? null;
        const userName = user.nome ?? user.nomeUsuario ?? user.name ?? user.username ?? 'Usuário';
        
        if (userId) {
          localStorage.setItem('userId', String(userId));
          localStorage.setItem('userName', userName);
          console.log('[Auth] 12. userId salvo no localStorage:', userId);
        } else {
          console.warn('[Auth] 12. ⚠️ Nenhum campo de ID encontrado no objeto user. Verifique o log 11b acima.');
        }
        
        updateUserUI(user);
      } else {
        console.log('[Auth] 12. Usuário não autenticado');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        updateGuestUI();
      }
    })
    .catch(error => {
      console.error('[Auth] ✗ Erro ao verificar autenticação:', error);
      console.error('[Auth]   Tipo do erro:', error.name);
      console.error('[Auth]   Mensagem:', error.message);
      updateGuestUI();
    });

  // Configura listener para dropdown
  const userMenuTrigger = document.querySelector('.user-menu-trigger');
  const userDropdown = document.getElementById('userDropdown');

  if (userMenuTrigger && userDropdown) {
    userMenuTrigger.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.classList.toggle('active');
      userDropdown.classList.toggle('active');
    });

    // Fecha dropdown ao clicar fora
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.auth-user')) {
        userMenuTrigger.classList.remove('active');
        userDropdown.classList.remove('active');
      }
    });
  }
}

/**
 * Atualiza a UI para usuário logado
 * @param {Object} user - Dados do usuário
 */
function updateUserUI(user) {
  const authGuest = document.getElementById('authGuest');
  const authUser = document.getElementById('authUser');

  if (authGuest && authUser) {
    authGuest.style.display = 'none';
    authUser.style.display = 'flex';

    // Atualiza dados do usuário
    const userName = document.getElementById('userName');
    const userAvatar = document.getElementById('userAvatar');

    if (userName) {
      userName.textContent = user.nome || user.nomeUsuario || 'Usuário';
    }

    if (userAvatar && user.avatar) {
      userAvatar.src = user.avatar;
    } else if (userAvatar) {
      userAvatar.src = 'https://via.placeholder.com/32?text=' + 
                       encodeURIComponent((user.nome || user.nomeUsuario || 'U').charAt(0));
    }
  }
}

/**
 * Atualiza a UI para visitante (não logado)
 */
function updateGuestUI() {
  const authGuest = document.getElementById('authGuest');
  const authUser = document.getElementById('authUser');

  if (authGuest && authUser) {
    authGuest.style.display = 'flex';
    authUser.style.display = 'none';
  }
}

// Exporta funções para testes (se necessário)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PANEL_DATA,
    PARTICLE_CONFIG,
    initParticles,
    openPanel,
    closePanel,
    showHome,
    toggleMobileMenu,
    getRepoBasePath,
    initializeAuthSystem,
    updateUserUI,
    updateGuestUI
  };
}