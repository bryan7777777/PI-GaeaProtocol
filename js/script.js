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
  const tryPaths = [
    `pages/${pageName}.html`,
    `./pages/${pageName}.html`,
    `../pages/${pageName}.html`,
    `/pages/${pageName}.html`,
    `${pageName}.html`,
    `./${pageName}.html`
  ];

  (async () => {
    let html = null;
    for (const p of tryPaths) {
      try {
        const resp = await fetch(p);
        if (resp.ok) {
          html = await resp.text();
          break;
        }
      } catch (e) {
        // tentar próximo candidato
      }
    }

    if (!html) {
      console.error('Não foi possível carregar a página. Tentados:', tryPaths);
      return;
    }

    // Parsar e extrair só o conteúdo principal (evita inserir <html> inteira dentro do main)
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const fetchedMain = doc.querySelector('.main-content') || doc.querySelector('main') || doc.body;

    const main = document.querySelector('.main-content');
    if (main) {
      main.innerHTML = fetchedMain ? fetchedMain.innerHTML : html;
      main.setAttribute('data-page', pageName);
      initParticles(); // reinicializa partículas na nova página
      setupEventListeners(); // reinstala listeners
    } else {
      console.error('Elemento .main-content não encontrado para inserir a página carregada.');
    }

    document.body.style.overflow = pageName === 'home' ? 'hidden' : 'auto';

    // Ajusta visibilidade do footer via classe "show"
    const footer = document.querySelector('.site-footer');
    if (footer) {
      footer.classList.toggle('show', pageName !== 'home');
    }

    window.scrollTo(0, 0);
  })();
}

function showHome() {
  // se já existe a seção home no DOM ou main já aponta para home, apenas scroll
  const homeEl = document.getElementById('home');
  const main = document.querySelector('.main-content');
  const dataPage = main ? main.getAttribute('data-page') : null;
  if (homeEl || dataPage === 'home') {
    window.scrollTo(0, 0);
    return;
  }

// if (window.location.pathname.includes('/pages/')) {
//     const indexPath = window.location.pathname.replace(/\/pages\/.*$/, '/index.html');
//     window.location.href = indexPath;
//     return;
// }

// Detecta automaticamente o nome do seu repositório no GitHub Pages
function getRepoBasePath() {
    const path = window.location.pathname.split('/');
    if (path.length > 1) {
        return '/' + path[1]; // ex: /PI-GaeaProtocol
    }
    return '';
}

function showHome() {
    const base = getRepoBasePath();
    window.location.href = base + '/index.html';
}

  // fallback: tentamos obter o index.html e extrair a seção .main-content/home
  const candidates = ['index.html', './index.html', '../index.html', '/index.html'];
  (async () => {
    for (const p of candidates) {
      try {
        const resp = await fetch(p);
        if (!resp.ok) continue;
        const html = await resp.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const fetchedMain = doc.querySelector('.main-content') || doc.querySelector('#home') || doc.body;
        if (fetchedMain) {
          if (main) {
            main.innerHTML = fetchedMain.innerHTML;
            main.setAttribute('data-page', 'home');
            initParticles();
            setupEventListeners();
          } else {
            // se não encontrou main atual, faça navegação simples
            window.location.href = p;
          }
          window.scrollTo(0, 0);
          return;
        }
      } catch (err) {
        // tenta próximo
      }
    }
    // se tudo falhar, redireciona ao root como último recurso
    window.location.href = '/';
  })();
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


// Aguardar o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }


  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
        if (navLinks) {
          navLinks.classList.remove('active');
        }
      }
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.skill-category, .project-card, .certificate-item').forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // // Panel functionality - definir funções globalmente
  // window.openPanel = function(panelId) {
  //     const panel = document.getElementById(panelId);
  //     if (panel) {
  //         panel.classList.add('active');
  //         document.body.style.overflow = 'hidden';
  //     }
  // };

  // window.closePanel = function(panelId) {
  //     const panel = document.getElementById(panelId);
  //     if (panel) {
  //         panel.classList.remove('active');
  //         document.body.style.overflow = '';
  //     }
  // };

  // // Close panel when clicking outside
  // document.querySelectorAll('.panel').forEach(function(panel) {
  //     panel.addEventListener('click', function(e) {
  //         if (e.target === panel) {
  //             closePanel(panel.id);
  //         }
  //     });
  // });

  // Add click handlers to certificate items
  document.querySelectorAll('.certificate-item').forEach(function (item) {
    item.addEventListener('click', function () {
      const panelId = item.getAttribute('data-panel');
      if (panelId) {
        openPanel(panelId);
      }
    });
  });

  // Fechar panel com tecla ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.panel.active').forEach(function (panel) {
        closePanel(panel.id);
      });
    }
  });
});

