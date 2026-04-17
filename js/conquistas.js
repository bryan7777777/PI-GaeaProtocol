/**
 * ============================================================
 * CONQUISTAS - Script
 * ============================================================
 * CRIADO: Prompt 4 - Página de Conquistas Completa
 * 
 * Carrega e renderiza grid de conquistas com filtros
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    let todasConquistas = [];
    
    // Carregar conquistas do servidor
    fetch('/PI-GaeaProtocol/php/get_conquistas.php')
        .then(r => r.json())
        .then(response => {
            if (response.status !== 'ok') {
                throw new Error(response.mensagem);
            }
            
            todasConquistas = response.dados;
            renderizar(todasConquistas);
            
            // Atualizar contador
            const total = todasConquistas.length;
            const desbloqueadas = todasConquistas.filter(c => c.desbloqueada == 1).length;
            document.getElementById('contador').textContent = 
                `${desbloqueadas} de ${total} conquistas desbloqueadas`;
        })
        .catch(err => {
            console.error('Erro ao carregar conquistas:', err);
            document.getElementById('conquistas-grid').innerHTML = 
                '<div class="erro"><i class="fas fa-exclamation-circle"></i> Erro ao carregar conquistas</div>';
        });
    
    // Configurar botões de filtro
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover classe ativo de todos
            document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('ativo'));
            btn.classList.add('ativo');
            
            // Aplicar filtro
            const filtro = btn.dataset.filtro;
            if (filtro === 'todas') {
                renderizar(todasConquistas);
            } else if (filtro === 'desbloqueadas') {
                renderizar(todasConquistas.filter(c => c.desbloqueada == 1));
            } else if (filtro === 'bloqueadas') {
                renderizar(todasConquistas.filter(c => c.desbloqueada == 0));
            }
        });
    });
    
    /**
     * Renderizar grid de conquistas
     * @param {Array} lista - Lista de conquistas a renderizar
     */
    function renderizar(lista) {
        const grid = document.getElementById('conquistas-grid');
        grid.innerHTML = '';
        
        if (lista.length === 0) {
            grid.innerHTML = '<div class="sem-conquistas"><p>Nenhuma conquista encontrada</p></div>';
            return;
        }
        
        lista.forEach((c, i) => {
            const pct = c.meta_valor > 0
                ? Math.min(100, Math.round((c.progresso_atual / c.meta_valor) * 100))
                : 0;
            
            const card = document.createElement('div');
            card.className = `conquista-card ${c.desbloqueada == 1 ? 'desbloqueada' : 'bloqueada'}`;
            card.style.animationDelay = `${i * 0.05}s`;
            
            card.innerHTML = `
                <div class="conquista-icone">
                    ${c.desbloqueada == 1 ? (c.icone || '🏆') : '🔒'}
                </div>
                <h3 class="conquista-nome">${c.nome}</h3>
                <p class="conquista-desc">${c.descricao}</p>
                <div class="progresso-barra">
                    <div class="progresso-fill" style="width:${pct}%"></div>
                </div>
                <span class="progresso-texto">${c.progresso_atual} / ${c.meta_valor}</span>
                <span class="conquista-tipo">${c.tipo}</span>
                ${c.desbloqueada == 1 ? `<span class="conquista-desbloqueada">✓</span>` : ''}
            `;
            
            grid.appendChild(card);
        });
    }
});