/**
 * ============================================================
 * JAVASCRIPT - DASHBOARD COMPLETO
 * ============================================================
 * Arquivo: /js/dashboard.js
 * 
 * Funcionalidade:
 *   - Fetch dados da API
 *   - Renderizar painel do jogador
 *   - Exibir histórico de partidas
 *   - Mostrar conquistas
 *   - Ranking mundial e pessoal
 *   - Atualização periódica
 * ============================================================
 */

class DashboardManager {
    constructor() {
        this.usuarioId = this.obterUsuarioId();
        // Detecta base path dinamicamente
        let basePath = window.location.pathname.includes('/PI-GaeaProtocol/') ? '/PI-GaeaProtocol' : '';
        if (!basePath) {
            basePath = '/PI-GaeaProtocol'; // Fallback
        }
        this.apiUrl = basePath + '/php/api/dashboard.php';
        this.atualizacaoIntervalo = 30000; // 30 segundos
        this.intervaloId = null;
        
        // Dados extraídos da API
        this.jogador = null;
        this.historicoPartidas = null;
        this.conquistas = null;
        this.rankingMundial = null;
        this.rankingPessoal = null;
        
        console.log('[Dashboard] ✓ Manager inicializado', { usuarioId: this.usuarioId, apiUrl: this.apiUrl });
    }

    /**
     * Obter ID do usuário da página ou do global
     */
    obterUsuarioId() {
        // Tentar do atributo data
        const elemento = document.querySelector('[data-usuario-id]');
        if (elemento) return parseInt(elemento.getAttribute('data-usuario-id'));
        
        // Tentar do global
        if (typeof window.USER_ID !== 'undefined') return window.USER_ID;
        
        // Tentar do localStorage
        const stored = localStorage.getItem('user_id');
        if (stored) return parseInt(stored);
        
        console.error('[Dashboard] Não foi possível obter user_id');
        return null;
    }

    /**
     * Fetch dos dados do dashboard
     */
    async carregarDados() {
        if (!this.usuarioId) {
            this.exibirErro('Usuário não autenticado');
            return;
        }

        const url = `${this.apiUrl}?usuario_id=${this.usuarioId}`;

        try {
            console.log('[Dashboard] Carregando dados...', url);
            
            const response = await fetch(url, {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                const erro = await response.json();
                throw new Error(erro.mensagem || `HTTP ${response.status}`);
            }

            this.dados = await response.json();

            if (this.dados.status !== 'ok') {
                throw new Error(this.dados.mensagem || 'Erro ao carregar dados');
            }

            // Extrair dados reais da resposta
            const dadosReais = this.dados.dados;
            
            console.log('[Dashboard] ✓ Dados carregados com sucesso', dadosReais);
            
            // Guardar os dados para usar na renderização
            this.jogador = dadosReais.jogador;
            this.historicoPartidas = dadosReais.historico_partidas;
            this.conquistas = dadosReais.conquistas;
            this.rankingMundial = dadosReais.ranking_mundial;
            this.rankingPessoal = dadosReais.ranking_pessoal;
            
            this.renderizar();
            
        } catch (erro) {
            console.error('[Dashboard] ✗ Erro ao carregar dados:', erro.message);
            this.exibirErro(`Erro ao carregar dashboard: ${erro.message}`);
        }
    }

    /**
     * Renderizar tudo
     */
    renderizar() {
        if (!this.jogador) return;

        this.renderizarPainelJogador();
        this.renderizarHistoricoPartidas();
        this.renderizarConquistas();
        this.renderizarRankingMundial();
        this.renderizarRankingPessoal();
    }

    /**
     * Painel do Jogador
     */
    renderizarPainelJogador() {
        const jogador = this.jogador;
        const container = document.getElementById('painel-jogador');
        
        if (!container || !jogador) return;

        const html = `
            <div class="jogador-avatar">
                <div class="jogador-avatar-img">👤</div>
            </div>
            <div class="jogador-info">
                <h1>${jogador.nome}</h1>
                <p>
                    <span class="jogador-level">Nível ${jogador.nivel}</span>
                    <span class="stat-label">Última visita: ${this.formatarData(jogador.ultimo_login)}</span>
                </p>
            </div>
            <div class="jogador-stats-quick">
                <div class="stat-item">
                    <span class="stat-label">Pontuação:</span>
                    <span class="stat-value">${this.formatarNumero(jogador.pontuacao_total)}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Win Rate:</span>
                    <span class="stat-value">${jogador.win_rate_percentual}%</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Partidas:</span>
                    <span class="stat-value">${jogador.total_partidas}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Maior Streak:</span>
                    <span class="stat-value">${jogador.maior_streak}</span>
                </div>
            </div>
        `;

        container.innerHTML = html;

        // Stats cards
        const statsContainer = document.getElementById('stats-cards');
        if (statsContainer) {
            statsContainer.innerHTML = `
                <div class="stat-card">
                    <div class="stat-card-title">Vitórias</div>
                    <div class="stat-card-value">${jogador.total_vitorias}</div>
                </div>
                <div class="stat-card danger">
                    <div class="stat-card-title">Derrotas</div>
                    <div class="stat-card-value">${jogador.total_derrotas}</div>
                </div>
                <div class="stat-card info">
                    <div class="stat-card-title">Conquistas</div>
                    <div class="stat-card-value">${jogador.conquistas_desbloqueadas}/27</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-title">Cartas Jogadas</div>
                    <div class="stat-card-value">${this.formatarNumero(jogador.cartas_jogadas)}</div>
                </div>
            `;
        }

        // Stats acumuladas
        const statsAcumuladas = document.getElementById('stats-acumuladas');
        if (statsAcumuladas) {
            statsAcumuladas.innerHTML = `
                <div class="stat-card">
                    <div class="stat-card-title">Dinheiro Ganho</div>
                    <div class="stat-card-value">${this.formatarNumero(jogador.dinheiro_total_ganho)}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-title">Dinheiro Gasto</div>
                    <div class="stat-card-value">${this.formatarNumero(jogador.dinheiro_total_gasto)}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-title">Lixo Reciclado</div>
                    <div class="stat-card-value">${this.formatarNumero(jogador.lixo_reciclado)}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-title">Taxa Gasto/Ganho</div>
                    <div class="stat-card-value">
                        ${jogador.dinheiro_total_ganho > 0 
                            ? ((jogador.dinheiro_total_gasto / jogador.dinheiro_total_ganho) * 100).toFixed(1) 
                            : 0}%
                    </div>
                </div>
            `;
        }
    }

    /**
     * Histórico de Partidas
     */
    renderizarHistoricoPartidas() {
        const container = document.getElementById('historico-partidas');
        if (!container) return;

        if (this.historicoPartidas.length === 0) {
            container.innerHTML = '<div class="empty-state">Nenhuma partida registrada.</div>';
            return;
        }

        let html = `
            <div class="table-responsive">
                <table class="dashboard-table">
                    <thead>
                        <tr>
                            <th>Data/Hora</th>
                            <th>Resultado</th>
                            <th>Pontuação</th>
                            <th>Duração</th>
                            <th>Cartas</th>
                            <th>Lixo</th>
                            <th>Stats Extras</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        this.historicoPartidas.forEach(partida => {
            const classResultado = partida.resultado_tipo === 'vitoria' ? 'vitoria' : 'derrota';
            
            html += `
                <tr>
                    <td class="partida-data">${this.formatarData(partida.data_hora)}</td>
                    <td class="partida-resultado">
                        <span class="resultado-badge ${classResultado}">
                            ${partida.resultado}
                        </span>
                    </td>
                    <td class="partida-pontuacao">${this.formatarNumero(partida.pontuacao)}</td>
                    <td class="partida-duracao">${partida.duracao_formatada}</td>
                    <td>${partida.cartas_jogadas}</td>
                    <td>${partida.lixo_reciclado}</td>
                    <td class="partida-stats">
                        <span title="Dano Total">⚔️ ${partida.dano_total}</span>
                        <span title="Cura Total">💚 ${partida.cura_total}</span>
                    </td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </div>
        `;

        container.innerHTML = html;
    }

    /**
     * Conquistas
     */
    renderizarConquistas() {
        const container = document.getElementById('conquistas');
        if (!container) return;

        const conquistas = this.conquistas;
        
        let html = `
            <div style="margin-bottom: 20px;">
                <h3>Progresso: ${conquistas.desbloqueadas}/${conquistas.total} (${conquistas.progresso_percentual}%)</h3>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${conquistas.progresso_percentual}%">
                        ${conquistas.progresso_percentual}%
                    </div>
                </div>
            </div>
            <div class="achievements-grid">
        `;

        // Mapeamento de ícones por categoria
        const icons = {
            boss: '🐉',
            escudo: '🛡️',
            vida: '❤️',
            reciclagem: '♻️',
            sinergia: '⚡',
            outro: '🏆'
        };

        conquistas.lista.forEach(conquista => {
            const icon = icons[conquista.categoria] || '🎯';
            const classDesbloqueada = conquista.desbloqueada ? 'desbloqueada' : '';
            const lock = conquista.desbloqueada ? '' : '🔒';
            
            html += `
                <div class="achievement-item ${classDesbloqueada}" title="${conquista.nome}">
                    ${lock ? `<span class="achievement-lock">${lock}</span>` : ''}
                    <div class="achievement-icon">${icon}</div>
                    <div class="achievement-name">${conquista.nome}</div>
                    <div class="achievement-tooltip">${conquista.descricao}</div>
                </div>
            `;
        });

        html += '</div>';

        container.innerHTML = html;
    }

    /**
     * Ranking Mundial
     */
    renderizarRankingMundial() {
        const container = document.getElementById('ranking-mundial');
        if (!container) return;

        if (this.rankingMundial.jogadores.length === 0) {
            container.innerHTML = '<div class="empty-state">Nenhum outro jogador registrado.</div>';
            return;
        }

        let html = '';

        this.rankingMundial.jogadores.forEach(jogador => {
            const medalhas = {
                1: '🥇',
                2: '🥈',
                3: '🥉'
            };
            const medalha = medalhas[jogador.posicao] || `#${jogador.posicao}`;
            
            html += `
                <div class="ranking-item">
                    <div class="ranking-posicao top${Math.min(jogador.posicao, 3)}">
                        ${medalha}
                    </div>
                    <div class="ranking-info">
                        <div class="ranking-nome">${jogador.nome}</div>
                        <div class="ranking-stats">
                            <div class="ranking-stats-item">
                                <span class="ranking-stats-label">📊 Pontos:</span>
                                <span class="ranking-stats-value">${this.formatarNumero(jogador.pontuacao)}</span>
                            </div>
                            <div class="ranking-stats-item">
                                <span class="ranking-stats-label">📈 Win Rate:</span>
                                <span class="ranking-stats-value">${jogador.win_rate_percentual}%</span>
                            </div>
                            <div class="ranking-stats-item">
                                <span class="ranking-stats-label">🎮 Nível:</span>
                                <span class="ranking-stats-value">${jogador.nivel}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    /**
     * Ranking Pessoal
     */
    renderizarRankingPessoal() {
        const container = document.getElementById('ranking-pessoal');
        if (!container) return;

        const ranking = this.rankingPessoal;
        const jogador = this.jogador;

        let medalha = `#${ranking.posicao}`;
        if (ranking.posicao === 1) medalha = '🥇';
        else if (ranking.posicao === 2) medalha = '🥈';
        else if (ranking.posicao === 3) medalha = '🥉';

        const html = `
            <div style="text-align: center;">
                <div class="ranking-posicao-label">Sua Posição</div>
                <div class="ranking-posicao-grande">${medalha}</div>
                <div style="margin-top: 15px; font-size: 1.2em;">
                    <div class="ranking-posicao-label">Pontuação</div>
                    <div style="color: var(--primary); font-weight: bold; font-size: 1.8em;">
                        ${this.formatarNumero(ranking.pontuacao)}
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    /**
     * Exibir erro
     */
    exibirErro(mensagem) {
        const container = document.getElementById('erro-container') || document.querySelector('.dashboard-container');
        if (container) {
            container.insertAdjacentHTML('afterbegin', `
                <div class="error">
                    ❌ ${mensagem}
                </div>
            `);
        }
    }

    /**
     * Helpers de formatação
     */
    formatarData(data) {
        if (!data) return '-';
        const d = new Date(data);
        return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    formatarNumero(num) {
        if (num === null || num === undefined) return '0';
        return parseInt(num).toLocaleString('pt-BR');
    }

    /**
     * Iniciar atualização periódica
     */
    iniciarAtualizacao() {
        this.intervaloId = setInterval(() => {
            console.log('[Dashboard] Atualizando dados...');
            this.carregarDados();
        }, this.atualizacaoIntervalo);
    }

    /**
     * Parar atualização
     */
    pararAtualizacao() {
        if (this.intervaloId) {
            clearInterval(this.intervaloId);
            this.intervaloId = null;
        }
    }
}

// ============================================================
// INICIALIZAR QUANDO DOCUMENTO CARREGA
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('[Dashboard] Inicializando...');
    
    const dashboard = new DashboardManager();
    
    // Guardar globalmente
    window.dashboardManager = dashboard;
    
    // Carregar dados inicial
    dashboard.carregarDados();
    
    // Iniciar atualização periódica
    dashboard.iniciarAtualizacao();

    console.log('[Dashboard] ✓ Inicializado com sucesso');
});

// Limpar ao descarregar
window.addEventListener('beforeunload', () => {
    if (window.dashboardManager) {
        window.dashboardManager.pararAtualizacao();
    }
});
