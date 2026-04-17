<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Gaea Protocol</title>
    <link rel="stylesheet" href="../../css/reset.css">
    <link rel="stylesheet" href="../../css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Megrim&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * { box-sizing: border-box; }
        
        body {
            background: linear-gradient(135deg, #0a1f15 0%, #051210 100%);
            color: #e0e0e0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 1rem;
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        
        /* ===== HEADER ===== */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            padding: 1.5rem;
            background: linear-gradient(135deg, rgba(44, 175, 80, 0.1) 0%, rgba(44, 175, 80, 0.05) 100%);
            border: 2px solid rgba(44, 175, 80, 0.3);
            border-radius: 12px;
        }
        
        .header h1 {
            font-family: 'Megrim', cursive;
            font-size: 2rem;
            color: #2caf50;
            text-shadow: 0 0 15px rgba(44, 175, 80, 0.3);
        }
        
        .accoes {
            display: flex;
            gap: 1rem;
        }
        
        button {
            padding: 0.7rem 1.2rem;
            background: rgba(44, 175, 80, 0.2);
            border: 1px solid #2caf50;
            color: #2caf50;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s;
        }
        
        button:hover {
            background: #2caf50;
            color: #0a1f15;
            box-shadow: 0 0 15px rgba(44, 175, 80, 0.4);
        }
        
        /* ===== CARDS GRID ===== */
        .grid-2 {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .card {
            background: linear-gradient(135deg, rgba(44, 175, 80, 0.05) 0%, rgba(13, 31, 24, 0.5) 100%);
            border: 2px solid rgba(44, 175, 80, 0.3);
            border-radius: 12px;
            padding: 1.5rem;
            transition: all 0.3s;
        }
        
        .card:hover {
            border-color: #2caf50;
            box-shadow: 0 0 20px rgba(44, 175, 80, 0.2);
        }
        
        .card h2 {
            color: #2caf50;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .card h2 i {
            font-size: 1.3rem;
        }
        
        .stat-item {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 0;
            border-bottom: 1px solid rgba(44, 175, 80, 0.1);
        }
        
        .stat-item:last-child {
            border-bottom: none;
        }
        
        .stat-label {
            color: #b0b0b0;
        }
        
        .stat-value {
            color: #2caf50;
            font-weight: bold;
        }
        
        /* ===== AVATAR PESSOAL ===== */
        .avatar-section {
            text-align: center;
            padding: 1rem;
        }
        
        .avatar-grande {
            width: 120px;
            height: 120px;
            margin: 0 auto 1rem;
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(44, 175, 80, 0.2) 0%, rgba(44, 175, 80, 0.05) 100%);
            border: 3px solid #2caf50;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            box-shadow: 0 0 20px rgba(44, 175, 80, 0.3);
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .avatar-grande:hover {
            box-shadow: 0 0 30px rgba(44, 175, 80, 0.5);
            transform: scale(1.05);
        }
        
        .avatar-grande img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
        }
        
        .nome-usuario {
            font-size: 1.5rem;
            color: #2caf50;
            font-weight: bold;
            margin-bottom: 0.5rem;
        }
        
        .posicao-ranking {
            color: #f59e0b;
            font-size: 0.9rem;
        }
        
        /* ===== TABELAS ===== */
        .tabela-container {
            overflow-x: auto;
            margin-bottom: 2rem;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
        }
        
        table thead {
            background: rgba(44, 175, 80, 0.2);
            border-bottom: 2px solid #2caf50;
        }
        
        table th {
            padding: 1rem;
            text-align: left;
            color: #2caf50;
            font-weight: bold;
        }
        
        table td {
            padding: 0.8rem 1rem;
            border-bottom: 1px solid rgba(44, 175, 80, 0.1);
        }
        
        table tr:hover {
            background: rgba(44, 175, 80, 0.05);
        }
        
        .resultado-vitoria {
            color: #10b981;
            font-weight: bold;
        }
        
        .resultado-derrota {
            color: #ef4444;
            font-weight: bold;
        }
        
        /* ===== LOADING E STATUS ===== */
        .loading {
            text-align: center;
            padding: 2rem;
            color: #2caf50;
        }
        
        .loading::after {
            content: '';
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(44, 175, 80, 0.3);
            border-top-color: #2caf50;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        .erro {
            padding: 1rem;
            background: rgba(239, 68, 68, 0.2);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: #ef4444;
            border-radius: 6px;
            margin-bottom: 1rem;
        }
        
        .paginacao {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        
        .paginacao button {
            padding: 0.5rem 1rem;
        }
        
        .paginacao button.ativa {
            background: #2caf50;
            color: #0a1f15;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- HEADER -->
        <div class="header">
            <h1>Dashboard</h1>
            <div class="accoes">
                <button onclick="atualizarDados()"><i class="fas fa-sync"></i> Atualizar</button>
                <button onclick="selecionarAvatar()"><i class="fas fa-image"></i> Alterar Avatar</button>
                <button onclick="voltar()"><i class="fas fa-arrow-left"></i> Voltar</button>
            </div>
        </div>
        
        <!-- SEÇÃO DE PERFIL PESSOAL -->
        <div class="grid-2">
            <div class="card avatar-section" id="card-perfil" style="grid-column: 1/-1;">
                <div class="avatar-grande" id="avatar-grande" onclick="selecionarAvatar()">
                    👤
                </div>
                <div class="nome-usuario" id="nome-usuario">Carregando...</div>
                <div class="posicao-ranking" id="posicao-ranking">Aguardando dados...</div>
            </div>
        </div>
        
        <!-- ESTATÍSTICAS E RANKINGS -->
        <div class="grid-2">
            <!-- Estatísticas Pessoais -->
            <div class="card" id="card-stats">
                <h2><i class="fas fa-chart-bar"></i> Suas Estatísticas</h2>
                <div class="loading">Carregando...</div>
            </div>
            
            <!-- Ranking Pessoal -->
            <div class="card" id="card-rank">
                <h2><i class="fas fa-trophy"></i> Sua Posição</h2>
                <div class="loading">Carregando...</div>
            </div>
        </div>
        
        <!-- HISTÓRICO DE PARTIDAS -->
        <div class="card" id="card-historico">
            <h2><i class="fas fa-history"></i> Últimas Partidas</h2>
            <div class="loading">Carregando...</div>
        </div>
        
        <!-- RANKING GLOBAL -->
        <div class="card" id="card-ranking-global">
            <h2><i class="fas fa-globe"></i> Top 10 Jogadores</h2>
            <div class="loading">Carregando...</div>
        </div>
    </div>
    
    <script>
        // Listener para quando uma partida é registrada
        window.addEventListener('partidaRegistrada', () => {
            console.log('Partida foi registrada! Atualizando dashboard...');
            setTimeout(atualizarDados, 1000);
        });
        
        // Carrega dados ao abrir a página
        document.addEventListener('DOMContentLoaded', atualizarDados);
        
        // Auto-atualiza a cada 30 segundos
        setInterval(atualizarDados, 30000);
        
        async function atualizarDados() {
            carregarEstatisticas();
            carregarRankingPessoal();
            carregarHistoricoPartidas();
            carregarRankingGlobal();
        }
        
        async function carregarEstatisticas() {
            const container = document.getElementById('card-stats');
            const loading = container.querySelector('.loading');
            
            try {
                const response = await fetch('../api/user_stats.php');
                const data = await response.json();
                
                if (!data.success) throw new Error(data.error || 'Erro desconhecido');
                
                const stats = data.stats;
                
                // Atualiza avatar e nome
                document.getElementById('nome-usuario').textContent = stats.usuario;
                if (stats.avatar) {
                    document.getElementById('avatar-grande').innerHTML = `<img src="../get_avatar.php?id=${stats.usuario}" alt="Avatar">`;
                }
                
                loading.innerHTML = `
                    <div class="stat-item">
                        <span class="stat-label">Total de Partidas</span>
                        <span class="stat-value">${stats.totalPartidas}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Vitórias</span>
                        <span class="stat-value">${stats.vitórias}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Derrotas</span>
                        <span class="stat-value">${stats.derrotas}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Win Rate</span>
                        <span class="stat-value">${stats.winRate}%</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Maior Streak</span>
                        <span class="stat-value">${stats.maiorStreak} 🔥</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Lixo Total</span>
                        <span class="stat-value">${stats.lixoTotal}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Pontuação Total</span>
                        <span class="stat-value">${stats.pontuação}</span>
                    </div>
                `;
                
            } catch (erro) {
                console.error('Erro ao carregar estatísticas:', erro);
                loading.innerHTML = `<div class="erro"><i class="fas fa-exclamation-circle"></i> ${erro.message}</div>`;
            }
        }
        
        async function carregarRankingPessoal() {
            const container = document.getElementById('card-rank');
            const loading = container.querySelector('.loading');
            
            try {
                const response = await fetch('../api/user_rank.php');
                const data = await response.json();
                
                if (!data.success) throw new Error(data.error || 'Erro desconhecido');
                
                const rank = data.rank;
                const posicaoTexto = `${rank.posição}º de ${rank.totalJogadores} jogadores`;
                
                document.getElementById('posicao-ranking').textContent = posicaoTexto;
                
                loading.innerHTML = `
                    <div class="stat-item">
                        <span class="stat-label">Sua Posição</span>
                        <span class="stat-value">${rank.posição}º lugar</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Pontuação</span>
                        <span class="stat-value">${rank.pontuação}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Vitórias</span>
                        <span class="stat-value">${rank.vitórias}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Win Rate</span>
                        <span class="stat-value">${rank.winRate}%</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Total de Jugadores</span>
                        <span class="stat-value">${rank.totalJogadores}</span>
                    </div>
                `;
                
            } catch (erro) {
                console.error('Erro ao carregar ranking pessoal:', erro);
                loading.innerHTML = `<div class="erro"><i class="fas fa-exclamation-circle"></i> ${erro.message}</div>`;
            }
        }
        
        async function carregarHistoricoPartidas(pagina = 1) {
            const container = document.getElementById('card-historico');
            const loading = container.querySelector('.loading');
            
            try {
                const limit = 10;
                const offset = (pagina - 1) * limit;
                const response = await fetch(`../api/user_matches.php?limit=${limit}&offset=${offset}`);
                const data = await response.json();
                
                if (!data.success) throw new Error(data.error || 'Erro desconhecido');
                
                if (data.partidas.length === 0) {
                    loading.innerHTML = '<p style="text-align:center;color:#9ca3af;">Nenhuma partida registrada ainda</p>';
                    return;
                }
                
                let html = '<div class="tabela-container"><table><thead><tr>' +
                    '<th>Data/Hora</th><th>Resultado</th><th>Lixo</th><th>Waves</th><th>Duração</th><th>Protocolo</th><th>Dificuldade</th>' +
                    '</tr></thead><tbody>';
                
                data.partidas.forEach(p => {
                    const resultadoClass = p.resultado === 'Vitória' ? 'resultado-vitoria' : 'resultado-derrota';
                    html += `<tr>
                        <td>${p.data}</td>
                        <td><span class="${resultadoClass}">${p.resultado}</span></td>
                        <td>${p.lixoColetado}</td>
                        <td>${p.wavesCompletadas}</td>
                        <td>${p.duração}</td>
                        <td>${p.protocolo}</td>
                        <td>${p.dificuldade}</td>
                    </tr>`;
                });
                
                html += '</tbody></table></div>';
                
                // Paginação
                if (data.paginação.páginas > 1) {
                    html += '<div class="paginacao">';
                    for (let i = 1; i <= data.paginação.páginas; i++) {
                        const classe = i === pagina ? 'ativa' : '';
                        html += `<button class="${classe}" onclick="carregarHistoricoPartidas(${i})">Página ${i}</button>`;
                    }
                    html += '</div>';
                }
                
                loading.innerHTML = html;
                
            } catch (erro) {
                console.error('Erro ao carregar histórico:', erro);
                loading.innerHTML = `<div class="erro"><i class="fas fa-exclamation-circle"></i> ${erro.message}</div>`;
            }
        }
        
        async function carregarRankingGlobal(pagina = 1) {
            const container = document.getElementById('card-ranking-global');
            const loading = container.querySelector('.loading');
            
            try {
                const limit = 10;
                const offset = (pagina - 1) * limit;
                const response = await fetch(`../api/global_rank.php?limit=${limit}&offset=${offset}`);
                const data = await response.json();
                
                if (!data.success) throw new Error(data.error || 'Erro desconhecido');
                
                if (data.ranking.length === 0) {
                    loading.innerHTML = '<p style="text-align:center;color:#9ca3af;">Sem dados de ranking</p>';
                    return;
                }
                
                let html = '<div class="tabela-container"><table><thead><tr>' +
                    '<th>Posição</th><th>Jogador</th><th>Pontuação</th><th>Vitórias</th><th>Derrotas</th><th>Win Rate</th>' +
                    '</tr></thead><tbody>';
                
                data.ranking.forEach(j => {
                    html += `<tr>
                        <td><strong>${j.posição}º</strong></td>
                        <td>${j.usuário}</td>
                        <td>${j.pontuação}</td>
                        <td><span style="color:#10b981">${j.vitórias}</span></td>
                        <td><span style="color:#ef4444">${j.derrotas}</span></td>
                        <td>${j.winRate}%</td>
                    </tr>`;
                });
                
                html += '</tbody></table></div>';
                
                // Paginação
                if (data.paginação.páginas > 1) {
                    html += '<div class="paginacao">';
                    for (let i = 1; i <= data.paginação.páginas; i++) {
                        const classe = i === pagina ? 'ativa' : '';
                        html += `<button class="${classe}" onclick="carregarRankingGlobal(${i})">Página ${i}</button>`;
                    }
                    html += '</div>';
                }
                
                loading.innerHTML = html;
                
            } catch (erro) {
                console.error('Erro ao carregar ranking global:', erro);
                loading.innerHTML = `<div class="erro"><i class="fas fa-exclamation-circle"></i> ${erro.message}</div>`;
            }
        }
        
        function selecionarAvatar() {
            window.location.href = './selecao_avatar.html';
        }
        
        function voltar() {
            window.location.href = '../../index.html';
        }
    </script>
</body>
</html>
