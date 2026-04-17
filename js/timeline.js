/**
 * ============================================================================
 * TIMELINE DE CONQUISTAS - JavaScript
 * ============================================================================
 * 
 * Responsável por:
 * - Carregar dados da API
 * - Exibir timeline visual
 * - Filtrar por categoria
 * - Mostrar detalhes em modal
 * - Atualizar progresso
 * 
 * ============================================================================
 */

const API_BASE = '../php/api/';
let dadosTimeline = null;
let categoriaSelecionada = 'todas';

// ============================================================================
// 1. INICIALIZAÇÃO
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    carregarTimeline();
});

// ============================================================================
// 2. CARREGAR TIMELINE
// ============================================================================

async function carregarTimeline(idUsuario = null) {
    try {
        let url = `${API_BASE}conquistas/timeline.php`;
        if (idUsuario) {
            url += `?idUsuario=${idUsuario}`;
        }
        
        const response = await fetch(url, {
            credentials: 'include'
        });
        
        const data = await response.json();
        
        if (data.status === 'ok' && data.dados) {
            dadosTimeline = data.dados;
            atualizarUI();
        } else {
            console.error('Erro:', data.mensagem);
        }
    } catch (erro) {
        console.error('Erro ao carregar timeline:', erro);
        document.getElementById('timeline-list').innerHTML = 
            '<div class="timeline-loading">Erro ao carregar timeline</div>';
    }
}

// ============================================================================
// 3. ATUALIZAR UI
// ============================================================================

function atualizarUI() {
    // Atualizar header com dados do usuário
    document.getElementById('user-name').textContent = dadosTimeline.usuario.nome;
    document.getElementById('user-level').textContent = `Nível ${dadosTimeline.usuario.nivel}`;
    
    // Atualizar estatísticas
    const stats = dadosTimeline.estatisticas;
    document.getElementById('stat-count').textContent = 
        `${stats.totalConquistas}/${stats.totalDisponiveis}`;
    document.getElementById('stat-percent').textContent = 
        `${stats.percentualProgresso}%`;
    document.getElementById('stat-points').textContent = 
        `+${stats.totalConquistas * 100}`;
    
    // Atualizar barra de progresso
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${stats.percentualProgresso}%`;
    progressBar.textContent = `${stats.percentualProgresso}%`;
    
    // Renderizar timeline
    renderizarTimeline();
    
    // Renderizar objetivos
    renderizarObjetivos();
}

// ============================================================================
// 4. RENDERIZAR TIMELINE
// ============================================================================

function renderizarTimeline() {
    const container = document.getElementById('timeline-list');
    const timeline = dadosTimeline.timeline || [];
    
    if (timeline.length === 0) {
        container.innerHTML = '<div class="timeline-loading">Nenhuma conquista desbloqueada ainda</div>';
        return;
    }
    
    // Filtrar por categoria
    let timelineFiltrada = timeline;
    if (categoriaSelecionada !== 'todas') {
        timelineFiltrada = timeline.filter(item => 
            item.categoriaConquista === categoriaSelecionada
        );
    }
    
    if (timelineFiltrada.length === 0) {
        container.innerHTML = `<div class="timeline-loading">Nenhuma conquista nesta categoria</div>`;
        return;
    }
    
    container.innerHTML = timelineFiltrada.map((item, index) => `
        <div class="timeline-item" onclick="abrirDetalhes(${index})">
            <div class="timeline-dot">${item.icone}</div>
            <div class="achievement-card">
                <div class="achievement-header">
                    <div class="achievement-title">${item.nomeConquista}</div>
                    <div class="achievement-date">${item.tempoRelativo}</div>
                </div>
                <p class="achievement-description">${item.descricaoConquista}</p>
                <span class="achievement-category">
                    📌 ${item.categoriaConquista}
                </span>
            </div>
        </div>
    `).join('');
}

// ============================================================================
// 5. RENDERIZAR OBJETIVOS
// ============================================================================

function renderizarObjetivos() {
    const container = document.getElementById('objectives-grid');
    const objetivos = dadosTimeline.estatisticas.proximosObjetivos || [];
    
    if (objetivos.length === 0) {
        container.innerHTML = '<p>Todas as conquistas desbloqueadas! 🎉</p>';
        return;
    }
    
    container.innerHTML = objetivos.map(obj => `
        <div class="objective-card" onclick="abrirDetalhesObjetivo('${obj.nome}', '${obj.descricao}')">
            <div class="objective-icon">${obj.icone}</div>
            <div class="objective-title">${obj.nome}</div>
            <p class="objective-description">${obj.descricao}</p>
            <span class="objective-badge">+${obj.pontos} pts</span>
        </div>
    `).join('');
}

// ============================================================================
// 6. FILTRAR POR CATEGORIA
// ============================================================================

function filtrarPorCategoria(categoria) {
    categoriaSelecionada = categoria;
    
    // Atualizar botões ativos
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Renderizar timeline filtrada
    renderizarTimeline();
}

// ============================================================================
// 7. ABRIR DETALHES
// ============================================================================

function abrirDetalhes(index) {
    let timeline = dadosTimeline.timeline;
    
    // Filtrar por categoria se necessário
    if (categoriaSelecionada !== 'todas') {
        timeline = timeline.filter(item => 
            item.categoriaConquista === categoriaSelecionada
        );
    }
    
    const conquista = timeline[index];
    if (!conquista) return;
    
    document.getElementById('conquista-icone-grande').textContent = conquista.icone;
    document.getElementById('conquista-nome').textContent = conquista.nomeConquista;
    document.getElementById('conquista-descricao').textContent = conquista.descricaoConquista;
    document.getElementById('conquista-categoria').textContent = 
        formatar_categoria(conquista.categoriaConquista);
    
    const data = new Date(conquista.dataDesbloqueio);
    document.getElementById('conquista-data').textContent = 
        data.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    
    document.getElementById('conquista-tempo').textContent = conquista.tempoRelativo;
    document.getElementById('conquista-pontos').textContent = '+100';
    
    abrirModal();
}

function abrirDetalhesObjetivo(nome, descricao) {
    document.getElementById('conquista-nome').textContent = nome;
    document.getElementById('conquista-descricao').textContent = descricao;
    document.getElementById('conquista-categoria').textContent = 'Objetivo';
    document.getElementById('conquista-data').textContent = '🎯 Próxima meta';
    document.getElementById('conquista-tempo').textContent = 'Em breve...';
    
    abrirModal();
}

// ============================================================================
// 8. MODAL
// ============================================================================

function abrirModal() {
    document.getElementById('modal-conquista').classList.add('show');
}

function fecharModal() {
    document.getElementById('modal-conquista').classList.remove('show');
}

// Fechar modal ao clicar fora
document.addEventListener('click', function(event) {
    const modal = document.getElementById('modal-conquista');
    if (event.target === modal) {
        fecharModal();
    }
});

// ============================================================================
// 9. FUNÇÕES AUXILIARES
// ============================================================================

function formatar_categoria(categoria) {
    const categorias = {
        'boss': '👑 Boss',
        'reciclagem': '♻️ Reciclagem',
        'vida': '❤️ Vida',
        'escudo': '🛡️ Escudo',
        'sinergia': '⚡ Sinergia'
    };
    return categorias[categoria] || categoria;
}

/**
 * Animar contadores
 */
function animarContador(elementId, valor) {
    const el = document.getElementById(elementId);
    let atual = 0;
    const passo = Math.ceil(valor / 20);
    
    const intervalo = setInterval(() => {
        atual += passo;
        if (atual >= valor) {
            atual = valor;
            clearInterval(intervalo);
        }
        el.textContent = atual;
    }, 20);
}
