/**
 * Dashboard Auto-Update
 * Integração com o sistema de registro de partidas
 * 
 * Este script faz:
 * 1. Monitora o evento 'partidaRegistrada' disparado ao final de partida
 * 2. Exibe notificação de visibilidade no dashboard
 * 3. Auto-atualiza os dados do dashboard sem recarregar a página
 */

// Verifica se há um dashboard aberto e avisa sobre a auto-atualização
function notificarDashboardAberto() {
    // Tenta descobrir se o dashboard está aberto
    try {
        // Se o dashboard está em outra aba, dispara evento
        const event = new CustomEvent('dashboardNotificacao', {
            detail: {
                tipo: 'partida_registrada',
                mensagem: 'Seus dados foram atualizados!',
                timestamp: new Date().toISOString()
            }
        });
        
        window.dispatchEvent(event);
    } catch (e) {
        console.log('Dashboard não está aberto na mesma aba');
    }
}

// Listener para quando uma partida é registrada
window.addEventListener('partidaRegistrada', (event) => {
    console.log('📊 Dashboard: Partida registrada!', event.detail);
    
    // Se o script de dashboard estiver carregado, atualiza os dados
    if (typeof atualizarDados === 'function') {
        console.log('📊 Atualizando dashboard em tempo real...');
        atualizarDados();
    }
    
    // Notifica o dashboard (em outras abas via localStorage)
    try {
        const notificacao = {
            tipo: 'partida_registrada',
            resultado: event.detail?.resultado || 'concluída',
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('dashboardNotificacao', JSON.stringify(notificacao));
        
        // Dispara evento no storage para abas abertas
        window.dispatchEvent(new Event('storage'));
    } catch (e) {
        console.error('Erro ao notificar dashboard:', e);
    }
});

// Se está no dashboard, monitora mudanças no localStorage
if (typeof window !== 'undefined' && document.title.includes('Dashboard')) {
    window.addEventListener('storage', (event) => {
        if (event.key === 'dashboardNotificacao') {
            const notificacao = JSON.parse(event.newValue || '{}');
            
            if (notificacao.tipo === 'partida_registrada') {
                console.log('📊 Dashboard: Notificação de partida registrada recebida!');
                
                // Atualiza os dados automaticamente
                if (typeof atualizarDados === 'function') {
                    setTimeout(atualizarDados, 500);
                }
                
                // Limpa a notificação
                localStorage.removeItem('dashboardNotificacao');
            }
        }
    });
}

// Função para exibir notificação temporária no dashboard
function exibirNotificacaoDashboard(mensagem, tipo = 'sucesso') {
    const container = document.querySelector('.container');
    
    if (!container) return;
    
    const notificacao = document.createElement('div');
    notificacao.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${tipo === 'sucesso' ? '#10b981' : '#f59e0b'};
        color: white;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: bold;
    `;
    
    notificacao.innerHTML = `
        <i class="fas fa-${tipo === 'sucesso' ? 'check-circle' : 'info-circle'}"></i>
        ${mensagem}
    `;
    
    document.body.appendChild(notificacao);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notificacao.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notificacao.remove(), 300);
    }, 3000);
}

// Estilos para animações
if (!document.querySelector('style[data-dashboard-ui]')) {
    const style = document.createElement('style');
    style.setAttribute('data-dashboard-ui', 'true');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

console.log('✅ Dashboard Auto-Update carregado');
