/**
 * ============================================================================
 * PAINEL DE ADMINISTRAÇÃO - JavaScript
 * ============================================================================
 * 
 * Responsável por:
 * - Carregar dados da API
 * - Gerenciar interface do admin
 * - Buscar, atualizar e deletar registros
 * - Exibir estatísticas e gráficos
 * 
 * ============================================================================
 */

const API_BASE = '../../php/api/';
const ADMIN_API = `${API_BASE}admin/`;

// ============================================================================
// 1. INICIALIZAÇÃO
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    verificarAutenticacaoAdmin();
    carregarSecao('dashboard');
    carregarDadosGlobais();
    
    // Auto-refresh a cada 30 segundos
    setInterval(() => {
        if (document.querySelector('.admin-section.active')) {
            const secaoAtiva = document.querySelector('.admin-section.active')?.id.replace('-section', '');
            if (secaoAtiva === 'dashboard') {
                carregarDashboard();
            }
        }
    }, 30000);
});

// ============================================================================
// 2. VERIFICAR AUTENTICAÇÃO
// ============================================================================

async function verificarAutenticacaoAdmin() {
    try {
        const response = await fetch(`${API_BASE}auth/verificar.php`, {
            method: 'GET',
            credentials: 'include'
        });
        
        const data = await response.json();
        
        if (!data.dados || data.dados.tipoUsuario !== 'admin') {
            window.location.href = '../../index.html';
            return;
        }
        
        document.getElementById('usuarioAtual').textContent = data.dados.nomeUsuario;
    } catch (erro) {
        console.error('Erro ao verificar autenticação:', erro);
        window.location.href = '../../index.html';
    }
}

// ============================================================================
// 3. NAVEGAÇÃO ENTRE SEÇÕES
// ============================================================================

function carregarSecao(secao, event) {
    if (event) event.preventDefault();
    
    // Remover estado ativo
    document.querySelectorAll('.admin-section').forEach(el => {
        el.classList.remove('active');
    });
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('active');
    });
    
    // Ativar seção
    const secaoElement = document.getElementById(`${secao}-section`);
    if (secaoElement) {
        secaoElement.classList.add('active');
    }
    
    // Ativar nav item
    event?.target.closest('.nav-item')?.classList.add('active');
    
    // Carregar dados
    switch (secao) {
        case 'dashboard':
            carregarDashboard();
            break;
        case 'usuarios':
            carregarUsuarios();
            break;
        case 'partidas':
            carregarPartidas();
            break;
        case 'conquistas':
            carregarConquistas();
            break;
        case 'logs':
            carregarLogs();
            break;
    }
}

// ============================================================================
// 4. CARREGAR DADOS GLOBAIS
// ============================================================================

async function carregarDadosGlobais() {
    try {
        const response = await fetch(`${ADMIN_API}dashboard/stats.php`, {
            credentials: 'include'
        });
        
        const data = await response.json();
        
        if (data.status === 'ok' && data.dados) {
            const stats = data.dados;
            document.getElementById('stat-usuarios').textContent = stats.totalUsuarios || 0;
            document.getElementById('stat-partidas').textContent = stats.totalPartidas || 0;
            document.getElementById('stat-taxa-vitoria').textContent = 
                (stats.taxaVitoria || 0).toFixed(1) + '%';
            document.getElementById('stat-conquistas').textContent = 
                stats.conquistasDesbloqueadas || 0;
        }
    } catch (erro) {
        console.error('Erro ao carregar estatísticas:', erro);
    }
}

// ============================================================================
// 5. DASHBOARD
// ============================================================================

async function carregarDashboard() {
    await carregarDadosGlobais();
    
    // Aqui seria carregado gráficos com Chart.js
    // Por enquanto, apenas placeholder
}

// ============================================================================
// 6. USUÁRIOS
// ============================================================================

async function carregarUsuarios() {
    try {
        const response = await fetch(`${ADMIN_API}usuarios/listar.php`, {
            credentials: 'include'
        });
        
        const data = await response.json();
        
        if (data.status === 'ok' && Array.isArray(data.dados)) {
            preencherTabelaUsuarios(data.dados);
        }
    } catch (erro) {
        console.error('Erro ao carregar usuários:', erro);
        document.getElementById('tbody-usuarios').innerHTML = 
            '<tr><td colspan="8" class="loading">Erro ao carregar usuários</td></tr>';
    }
}

function preencherTabelaUsuarios(usuarios) {
    const tbody = document.getElementById('tbody-usuarios');
    
    if (usuarios.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="loading">Nenhum usuário encontrado</td></tr>';
        return;
    }
    
    tbody.innerHTML = usuarios.map(usuario => `
        <tr>
            <td>${usuario.idUsuario}</td>
            <td>${usuario.nomeUsuario}</td>
            <td>${usuario.emailUsuario}</td>
            <td>
                <span class="status-role ${usuario.tipoUsuario}">
                    ${usuario.tipoUsuario === 'admin' ? '👑 Admin' : '🎮 Jogador'}
                </span>
            </td>
            <td>${usuario.nivelJogador}</td>
            <td>${usuario.pontuacaoTotal}</td>
            <td>
                <span class="status-${usuario.usuarioAtivo ? 'ativo' : 'inativo'}">
                    ${usuario.usuarioAtivo ? '● Online' : '○ Inativo'}
                </span>
            </td>
            <td>
                <button class="btn-primary btn-sm" onclick="abrirModalUsuario('editar', ${usuario.idUsuario})">
                    Editar
                </button>
                <button class="btn-danger" onclick="deletarUsuario(${usuario.idUsuario})">
                    Del
                </button>
            </td>
        </tr>
    `).join('');
}

function filtrarUsuarios(termo) {
    const tbody = document.getElementById('tbody-usuarios');
    const linhas = tbody.querySelectorAll('tr');
    
    linhas.forEach(linha => {
        const texto = linha.textContent.toLowerCase();
        linha.style.display = texto.includes(termo.toLowerCase()) ? '' : 'none';
    });
}

async function abrirModalUsuario(modo, idUsuario = null) {
    const modal = document.getElementById('modal-usuario');
    const form = document.getElementById('form-usuario');
    
    form.reset();
    document.getElementById('usuario-id').value = idUsuario || '';
    
    if (modo === 'editar' && idUsuario) {
        try {
            const response = await fetch(`${ADMIN_API}usuarios/obter.php?id=${idUsuario}`, {
                credentials: 'include'
            });
            
            const data = await response.json();
            
            if (data.status === 'ok' && data.dados) {
                const usuario = data.dados;
                document.getElementById('usuario-nome').value = usuario.nomeUsuario;
                document.getElementById('usuario-email').value = usuario.emailUsuario;
                document.getElementById('usuario-role').value = usuario.tipoUsuario;
                document.getElementById('usuario-ativo').checked = usuario.usuarioAtivo;
            }
        } catch (erro) {
            console.error('Erro ao carregar usuário:', erro);
        }
    }
    
    modal.classList.add('show');
}

async function salvarUsuario(event) {
    event.preventDefault();
    
    const idUsuario = document.getElementById('usuario-id').value;
    const dados = {
        nomeUsuario: document.getElementById('usuario-nome').value,
        emailUsuario: document.getElementById('usuario-email').value,
        tipoUsuario: document.getElementById('usuario-role').value,
        usuarioAtivo: document.getElementById('usuario-ativo').checked ? 1 : 0
    };
    
    try {
        const endpoint = idUsuario 
            ? `${ADMIN_API}usuarios/atualizar.php`
            : `${ADMIN_API}usuarios/criar.php`;
        
        if (idUsuario) {
            dados.idUsuario = idUsuario;
        }
        
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(dados)
        });
        
        const result = await response.json();
        
        if (result.status === 'ok') {
            fecharModal('modal-usuario');
            carregarUsuarios();
            alert('Usuário salvo com sucesso!');
        } else {
            alert('Erro: ' + result.mensagem);
        }
    } catch (erro) {
        console.error('Erro ao salvar usuário:', erro);
        alert('Erro ao salvar usuário');
    }
}

async function deletarUsuario(idUsuario) {
    if (!confirm('Tem certeza que deseja deletar este usuário?')) {
        return;
    }
    
    try {
        const response = await fetch(`${ADMIN_API}usuarios/deletar.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ idUsuario })
        });
        
        const result = await response.json();
        
        if (result.status === 'ok') {
            carregarUsuarios();
            alert('Usuário deletado');
        } else {
            alert('Erro: ' + result.mensagem);
        }
    } catch (erro) {
        console.error('Erro ao deletar usuário:', erro);
    }
}

// ============================================================================
// 7. PARTIDAS
// ============================================================================

async function carregarPartidas() {
    try {
        const response = await fetch(`${ADMIN_API}partidas/listar.php`, {
            credentials: 'include'
        });
        
        const data = await response.json();
        
        if (data.status === 'ok' && Array.isArray(data.dados)) {
            preencherTabelaPartidas(data.dados);
        }
    } catch (erro) {
        console.error('Erro ao carregar partidas:', erro);
    }
}

function preencherTabelaPartidas(partidas) {
    const tbody = document.getElementById('tbody-partidas');
    
    if (partidas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7">Nenhuma partida</td></tr>';
        return;
    }
    
    tbody.innerHTML = partidas.map(partida => `
        <tr>
            <td>#${partida.idPartida}</td>
            <td>${partida.nomeUsuario}</td>
            <td>
                <span class="resultado-${partida.resultadoPartida.toLowerCase()}">
                    ${partida.resultadoPartida === 'Vitoria' ? '✓ Vitória' : '✗ Derrota'}
                </span>
            </td>
            <td>${partida.pontuacaoPartida}</td>
            <td>${formatarSegundos(partida.duracaoSegundos)}</td>
            <td>${new Date(partida.dataHoraPartida).toLocaleString('pt-BR')}</td>
            <td>
                <button class="btn-primary btn-sm" onclick="verPartidaDetalhes(${partida.idPartida})">
                    Ver
                </button>
            </td>
        </tr>
    `).join('');
}

function filtrarPartidas() {
    const idUsuario = document.getElementById('filter-usuario').value;
    const resultado = document.getElementById('filter-resultado').value;
    
    // Aqui você chamaria a API com filtros
    // Por enquanto recarregamos tudo
    carregarPartidas();
}

function verPartidaDetalhes(idPartida) {
    console.log('Ver detalhes da partida:', idPartida);
    // Implementar modal com detalhes
}

// ============================================================================
// 8. CONQUISTAS
// ============================================================================

async function carregarConquistas() {
    try {
        const response = await fetch(`${ADMIN_API}conquistas/listar.php`, {
            credentials: 'include'
        });
        
        const data = await response.json();
        
        if (data.status === 'ok' && Array.isArray(data.dados)) {
            preencherGridConquistas(data.dados);
        }
    } catch (erro) {
        console.error('Erro ao carregar conquistas:', erro);
    }
}

function preencherGridConquistas(conquistas) {
    const container = document.getElementById('lista-conquistas');
    
    if (conquistas.length === 0) {
        container.innerHTML = '<p>Nenhuma conquista</p>';
        return;
    }
    
    container.innerHTML = conquistas.map(conquista => `
        <div class="conquista-card">
            <div class="conquista-icon">${conquista.iconeConquista}</div>
            <h4>${conquista.nomeConquista}</h4>
            <p>${conquista.descricaoConquista.substring(0, 50)}...</p>
            <span class="categoria">${conquista.categoriaConquista}</span>
            <div style="margin-top: 10px; display: flex; gap: 5px;">
                <button class="btn-primary btn-sm" onclick="abrirModalConquista('editar', ${conquista.idConquista})">
                    Editar
                </button>
                <button class="btn-danger btn-sm" onclick="deletarConquista(${conquista.idConquista})">
                    Del
                </button>
            </div>
        </div>
    `).join('');
}

async function abrirModalConquista(modo, idConquista = null) {
    const modal = document.getElementById('modal-conquista');
    const form = document.getElementById('form-conquista');
    
    form.reset();
    document.getElementById('conquista-id').value = idConquista || '';
    
    if (modo === 'editar' && idConquista) {
        try {
            const response = await fetch(`${ADMIN_API}conquistas/obter.php?id=${idConquista}`, {
                credentials: 'include'
            });
            
            const data = await response.json();
            
            if (data.status === 'ok' && data.dados) {
                const conquista = data.dados;
                document.getElementById('conquista-nome').value = conquista.nomeConquista;
                document.getElementById('conquista-descricao').value = conquista.descricaoConquista;
                document.getElementById('conquista-categoria').value = conquista.categoriaConquista;
            }
        } catch (erro) {
            console.error('Erro:', erro);
        }
    }
    
    modal.classList.add('show');
}

async function salvarConquista(event) {
    event.preventDefault();
    
    const idConquista = document.getElementById('conquista-id').value;
    const dados = {
        nomeConquista: document.getElementById('conquista-nome').value,
        descricaoConquista: document.getElementById('conquista-descricao').value,
        categoriaConquista: document.getElementById('conquista-categoria').value
    };
    
    try {
        const endpoint = idConquista 
            ? `${ADMIN_API}conquistas/atualizar.php`
            : `${ADMIN_API}conquistas/criar.php`;
        
        if (idConquista) {
            dados.idConquista = idConquista;
        }
        
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(dados)
        });
        
        const result = await response.json();
        
        if (result.status === 'ok') {
            fecharModal('modal-conquista');
            carregarConquistas();
            alert('Conquista salva!');
        } else {
            alert('Erro: ' + result.mensagem);
        }
    } catch (erro) {
        console.error('Erro:', erro);
    }
}

async function deletarConquista(idConquista) {
    if (!confirm('Deletar esta conquista?')) return;
    
    try {
        const response = await fetch(`${ADMIN_API}conquistas/deletar.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ idConquista })
        });
        
        const result = await response.json();
        
        if (result.status === 'ok') {
            carregarConquistas();
            alert('Conquista deletada');
        }
    } catch (erro) {
        console.error('Erro:', erro);
    }
}

// ============================================================================
// 9. LOGS
// ============================================================================

async function carregarLogs() {
    try {
        const response = await fetch(`${ADMIN_API}logs/listar.php`, {
            credentials: 'include'
        });
        
        const data = await response.json();
        
        if (data.status === 'ok' && Array.isArray(data.dados)) {
            preencherTabelaLogs(data.dados);
        }
    } catch (erro) {
        console.error('Erro ao carregar logs:', erro);
    }
}

function preencherTabelaLogs(logs) {
    const tbody = document.getElementById('tbody-logs');
    
    if (logs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5">Nenhum log</td></tr>';
        return;
    }
    
    tbody.innerHTML = logs.map(log => `
        <tr>
            <td>${log.nomeUsuario}</td>
            <td><span class="tipo-evento">${log.tipoEvento}</span></td>
            <td>${new Date(log.dataHoraEvento).toLocaleString('pt-BR')}</td>
            <td>${log.enderecoIPCliente}</td>
            <td>${log.mensagemEvento || '-'}</td>
        </tr>
    `).join('');
}

function filtrarLogs() {
    // Implementar filtros
    carregarLogs();
}

// ============================================================================
// 10. FUNÇÕES AUXILIARES
// ============================================================================

function fecharModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
}

function formatarSegundos(segundos) {
    const minutos = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${minutos}m ${secs}s`;
}

async function fazerLogout() {
    try {
        await fetch('../../php/User/logout.php', {
            method: 'POST',
            credentials: 'include'
        });
    } catch (erro) {
        console.error('Erro ao fazer logout:', erro);
    }
    
    window.location.href = '../../index.html';
}

// Fechar modal ao clicar fora
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('show');
    }
});
