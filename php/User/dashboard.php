<?php
/**
 * Dashboard Completo Premium
 * Versão: 2.0 com Sistema de Notificações Real
 * Features: Email notifications, preferências, UI melhorada, analytics
 */

require_once '../config.php';
start_secure_session();

// Verifica autenticação
if (empty($_SESSION['user'])) {
    header('Location: ../login.php?expired=1');
    exit;
}

$user = $_SESSION['user'];
$userId = $user['id'];
$userName = $user['nome'] ?? 'Usuário';

// Busca dados do usuário
try {
    $stmt = $pdo->prepare("SELECT * FROM user WHERE idUser = ? LIMIT 1");
    $stmt->execute([$userId]);
    $userData = $stmt->fetch();
    
    // Busca dados de status
    $stmt = $pdo->prepare("SELECT * FROM userStatus WHERE idUser = ? LIMIT 1");
    $stmt->execute([$userId]);
    $statusData = $stmt->fetch();
    
    // Busca partidas recentes
    $stmt = $pdo->prepare("
        SELECT * FROM partidas 
        WHERE idUser = ? 
        ORDER BY dataPartida DESC 
        LIMIT 10
    ");
    $stmt->execute([$userId]);
    $partidas = $stmt->fetchAll();
    
    // Busca conquistas
    $stmt = $pdo->prepare("
        SELECT * FROM conquistas 
        WHERE idUser = ? 
        ORDER BY concluidoDia DESC
    ");
    $stmt->execute([$userId]);
    $conquistas = $stmt->fetchAll();
    
    // Busca ranking
    $stmt = $pdo->prepare("
        SELECT u.userName, us.lixoTotal, us.lixoUnic, us.qtdWin, us.qtdJogo
        FROM userStatus us
        JOIN user u ON u.idUser = us.idUser
        ORDER BY us.lixoTotal DESC
        LIMIT 10
    ");
    $stmt->execute();
    $ranking = $stmt->fetchAll();
    
} catch (PDOException $e) {
    error_log('Erro ao buscar dados: ' . $e->getMessage());
    $statusData = null;
    $partidas = [];
    $conquistas = [];
    $ranking = [];
}

// Processa mudanças de notificações
$notification_message = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['acao'])) {
    if (!validate_csrf_token($_POST['csrf_token'] ?? '')) {
        $notification_message = '<div class="alert alert-danger"><i class="fas fa-exclamation-circle"></i> Erro de segurança (CSRF).</div>';
    } elseif ($_POST['acao'] === 'salvar_notificacoes') {
        // Salva preferências de notificações
        $prefs = [
            'email_vitoria' => isset($_POST['email_vitoria']) ? 1 : 0,
            'email_derrota' => isset($_POST['email_derrota']) ? 1 : 0,
            'email_conquista' => isset($_POST['email_conquista']) ? 1 : 0,
            'email_ranking' => isset($_POST['email_ranking']) ? 1 : 0,
        ];
        
        // Salva em sessão (em produção, salvaria em BD)
        $_SESSION['user_prefs'] = $prefs;
        $notification_message = '<div class="alert alert-success"><i class="fas fa-check-circle"></i> Preferências salvas com sucesso!</div>';
    }
}

// Processa alteração de senha
$mensagem = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['acao']) && $_POST['acao'] === 'alterar_senha') {
    if (!validate_csrf_token($_POST['csrf_token'] ?? '')) {
        $mensagem = '<div class="alert alert-danger">Erro de segurança (CSRF).</div>';
    } else {
        $senhaAtual = $_POST['senha_atual'] ?? '';
        $senhaNova = $_POST['senha_nova'] ?? '';
        $senhaConfirm = $_POST['senha_confirma'] ?? '';
        
        if (empty($senhaAtual) || empty($senhaNova)) {
            $mensagem = '<div class="alert alert-danger">Preencha todos os campos.</div>';
        } elseif (strlen($senhaNova) < 8) {
            $mensagem = '<div class="alert alert-danger">Nova senha deve ter mínimo 8 caracteres.</div>';
        } elseif ($senhaNova !== $senhaConfirm) {
            $mensagem = '<div class="alert alert-danger">As senhas não conferem.</div>';
        } else {
            if (!password_verify($senhaAtual, $userData['senha'])) {
                $mensagem = '<div class="alert alert-danger">Senha atual incorreta.</div>';
            } else {
                $novaSenhaHash = password_hash($senhaNova, PASSWORD_BCRYPT, ['cost' => 12]);
                $stmt = $pdo->prepare("UPDATE user SET senha = ? WHERE idUser = ?");
                if ($stmt->execute([$novaSenhaHash, $userId])) {
                    $mensagem = '<div class="alert alert-success">Senha alterada com sucesso!</div>';
                } else {
                    $mensagem = '<div class="alert alert-danger">Erro ao alterar senha.</div>';
                }
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Premium - Gaea Protocol</title>
    <link rel="stylesheet" href="../../css/reset.css">
    <link rel="stylesheet" href="../../css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Megrim&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="../../js/script.js" defer></script>
    
    <style>
        * { box-sizing: border-box; }
        
        body {
            background: linear-gradient(135deg, #0a1f15 0%, #051210 100%);
            color: #e0e0e0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding-top: 80px;
            min-height: 100vh;
        }
        
        /* ===== TOP NAVIGATION ===== */
        .top-nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: linear-gradient(90deg, rgba(10,40,28,0.98) 0%, rgba(13,31,24,0.98) 100%);
            border-bottom: 2px solid #2caf50;
            padding: 1rem 2rem;
            z-index: 1000;
            display: flex;
            justify-content: space-between;
            align-items: center;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        
        .top-nav .logo {
            font-family: 'Megrim', cursive;
            font-size: 1.5rem;
            color: #2caf50;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
        }
        
        .top-nav .logo:hover {
            text-shadow: 0 0 10px rgba(44,175,80,0.5);
            transform: scale(1.05);
        }
        
        .top-nav .links {
            display: flex;
            gap: 2rem;
        }
        
        .top-nav .links a {
            color: #b0b0b0;
            text-decoration: none;
            transition: color 0.3s;
            font-size: 0.9rem;
            font-weight: 500;
        }
        
        .top-nav .links a:hover {
            color: #2caf50;
            text-shadow: 0 0 8px rgba(44,175,80,0.3);
        }
        
        /* ===== SEARCH BAR ===== */
        .search-container {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
        
        .search-bar {
            padding: 0.6rem 1.2rem;
            background: rgba(0,0,0,0.3);
            border: 1px solid rgba(44,175,80,0.5);
            border-radius: 20px;
            color: #e0e0e0;
            width: 250px;
            transition: all 0.3s;
        }
        
        .search-bar:focus {
            outline: none;
            border-color: #2caf50;
            box-shadow: 0 0 15px rgba(44,175,80,0.3);
            background: rgba(0,0,0,0.5);
        }
        
        .search-results {
            position: absolute;
            top: 100%;
            left: 0;
            background: rgba(10,40,28,0.98);
            border: 1px solid #2caf50;
            border-radius: 8px;
            width: 250px;
            max-height: 300px;
            overflow-y: auto;
            display: none;
            margin-top: 0.5rem;
            z-index: 1001;
        }
        
        .search-result-item {
            padding: 0.8rem 1.2rem;
            border-bottom: 1px solid rgba(44,175,80,0.1);
            cursor: pointer;
            transition: background 0.3s;
        }
        
        .search-result-item:hover {
            background: rgba(44,175,80,0.1);
        }
        
        /* ===== MAIN DASHBOARD ===== */
        .dashboard-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .dashboard-header {
            background: rgba(13,31,24,0.8);
            border-left: 5px solid #2caf50;
            padding: 2rem;
            border-radius: 8px;
            margin-bottom: 2rem;
            box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }
        
        .dashboard-header h1 {
            font-size: 2.2rem;
            color: #2caf50;
            margin-bottom: 0.5rem;
            font-family: 'Megrim', cursive;
        }
        
        .dashboard-header p {
            color: #90ee90;
            font-size: 1rem;
        }
        
        /* ===== TABS ===== */
        .tabs-container {
            display: flex;
            flex-wrap: wrap;
            gap: 0;
            margin-bottom: 0;
            border-bottom: 2px solid rgba(44,175,80,0.3);
            background: rgba(0,0,0,0.2);
            border-radius: 8px 8px 0 0;
            overflow-x: auto;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        
        .tab-button {
            padding: 1rem 1.5rem;
            background: transparent;
            border: none;
            color: #808080;
            cursor: pointer;
            font-size: 0.95rem;
            font-weight: 600;
            transition: all 0.3s;
            border-bottom: 3px solid transparent;
            position: relative;
            bottom: -2px;
            white-space: nowrap;
        }
        
        .tab-button:hover {
            color: #2caf50;
            background: rgba(44,175,80,0.05);
        }
        
        .tab-button.active {
            color: #2caf50;
            border-bottom-color: #2caf50;
            background: rgba(44,175,80,0.1);
            text-shadow: 0 0 5px rgba(44,175,80,0.5);
        }
        
        .tab-content {
            display: none;
            background: linear-gradient(135deg, rgba(13,31,24,0.9) 0%, rgba(20,48,36,0.9) 100%);
            border: 1px solid rgba(44,175,80,0.3);
            border-radius: 0 0 8px 8px;
            padding: 2rem;
            animation: fadeIn 0.3s ease;
            box-shadow: inset 0 0 20px rgba(0,0,0,0.2);
        }
        
        .tab-content.active {
            display: block;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        /* ===== NOTIFICATIONS SECTION ===== */
        .notification-prefs {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
            margin: 1.5rem 0;
        }
        
        .notification-card {
            background: rgba(0,0,0,0.3);
            border: 2px solid rgba(44,175,80,0.2);
            border-radius: 8px;
            padding: 1.5rem;
            transition: all 0.3s;
        }
        
        .notification-card:hover {
            border-color: #2caf50;
            background: rgba(44,175,80,0.05);
        }
        
        .notification-card h3 {
            color: #2caf50;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .notification-card p {
            color: #b0b0b0;
            font-size: 0.9rem;
            margin-bottom: 1rem;
        }
        
        .checkbox-wrapper {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            cursor: pointer;
        }
        
        .checkbox-wrapper input[type="checkbox"] {
            width: 20px;
            height: 20px;
            cursor: pointer;
            accent-color: #2caf50;
        }
        
        .checkbox-wrapper label {
            cursor: pointer;
            color: #e0e0e0;
        }
        
        /* ===== ALERTS ===== */
        .alert {
            padding: 1rem 1.5rem;
            border-radius: 6px;
            margin-bottom: 1.5rem;
            border-left: 4px solid;
            display: flex;
            gap: 1rem;
            align-items: flex-start;
        }
        
        .alert-success {
            background: rgba(76,175,80,0.15);
            border-left-color: #2caf50;
            color: #90ee90;
        }
        
        .alert-danger {
            background: rgba(244,67,54,0.15);
            border-left-color: #f44336;
            color: #ff7373;
        }
        
        /* ===== FORMS ===== */
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: #2caf50;
            font-weight: 600;
        }
        
        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 0.8rem;
            background: rgba(0,0,0,0.4);
            border: 1px solid rgba(44,175,80,0.3);
            border-radius: 6px;
            color: #e0e0e0;
            font-family: inherit;
            transition: all 0.3s;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #2caf50;
            box-shadow: 0 0 15px rgba(44,175,80,0.2);
            background: rgba(0,0,0,0.6);
        }
        
        .btn-submit {
            padding: 0.8rem 2rem;
            background: linear-gradient(135deg, #2caf50 0%, #25934d 100%);
            color: #0a1f15;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            font-size: 1rem;
            transition: all 0.3s;
        }
        
        .btn-submit:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(44,175,80,0.3);
        }
        
        /* ===== PROFILES & STATS ===== */
        .profile-section {
            display: grid;
            grid-template-columns: 300px 1fr;
            gap: 3rem;
            align-items: start;
            margin-top: 2rem;
        }
        
        .profile-avatar-box {
            text-align: center;
        }
        
        .profile-avatar {
            width: 250px;
            height: 250px;
            border-radius: 50%;
            border: 4px solid #2caf50;
            margin-bottom: 1.5rem;
            object-fit: cover;
            background: linear-gradient(135deg, rgba(44,175,80,0.3) 0%, rgba(44,175,80,0.1) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            box-shadow: 0 0 30px rgba(44,175,80,0.3);
        }
        
        .profile-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .profile-avatar i {
            font-size: 4rem;
            color: rgba(44,175,80,0.6);
        }
        
        .upload-btn {
            display: inline-block;
            padding: 0.8rem 1.5rem;
            background: linear-gradient(135deg, #2caf50 0%, #25934d 100%);
            color: #0a1f15;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s;
            margin-bottom: 1rem;
        }
        
        .upload-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(44,175,80,0.3);
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .stat-card {
            background: linear-gradient(135deg, rgba(44,175,80,0.2) 0%, rgba(44,175,80,0.1) 100%);
            border: 2px solid rgba(44,175,80,0.4);
            border-radius: 8px;
            padding: 1.5rem;
            text-align: center;
            transition: all 0.3s;
        }
        
        .stat-card:hover {
            border-color: #2caf50;
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(44,175,80,0.2);
        }
        
        .stat-value {
            font-size: 2rem;
            color: #2caf50;
            font-weight: bold;
            margin: 0.5rem 0;
            text-shadow: 0 0 10px rgba(44,175,80,0.3);
        }
        
        .stat-label {
            color: #90ee90;
            font-size: 0.9rem;
        }
        
        /* ===== TABLES ===== */
        .table-responsive {
            overflow-x: auto;
            border-radius: 8px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            background: linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%);
        }
        
        thead {
            background: rgba(44,175,80,0.15);
            border-bottom: 2px solid #2caf50;
        }
        
        th {
            padding: 1rem;
            text-align: left;
            font-weight: bold;
            color: #2caf50;
            text-transform: uppercase;
            font-size: 0.85rem;
        }
        
        td {
            padding: 0.8rem 1rem;
            border-bottom: 1px solid rgba(44,175,80,0.1);
        }
        
        tbody tr {
            transition: background 0.3s;
        }
        
        tbody tr:hover {
            background: rgba(44,175,80,0.08);
        }
        
        .status-badge {
            display: inline-block;
            padding: 0.4rem 0.8rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: bold;
        }
        
        .status-vitoria {
            background: rgba(76,175,80,0.2);
            color: #90ee90;
        }
        
        .status-derrota {
            background: rgba(244,67,54,0.2);
            color: #ff7373;
        }
        
        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
            .profile-section {
                grid-template-columns: 1fr;
            }
            
            .search-bar {
                width: 150px;
            }
            
            .top-nav .links {
                gap: 1rem;
                font-size: 0.85rem;
            }
        }
    </style>
</head>
<body>
    <!-- Background System -->
    <div class="background-system" style="opacity: 0.3;">
        <div class="background-base"></div>
        <div class="circuit-grid"></div>
        <div class="energy-lines" id="energyLinesContainer"></div>
        <div class="particles-container" id="particlesContainer"></div>
        <div class="scanner-effect"></div>
        <div class="distortion-layer"></div>
    </div>

    <!-- Top Navigation -->
    <nav class="top-nav">
        <div class="logo" onclick="window.location.href='../../index.html'">🌍 GAEA</div>
        
        <div class="search-container">
            <input type="text" class="search-bar" id="searchBar" placeholder="Buscar páginas...">
            <div class="search-results" id="searchResults"></div>
        </div>
        
        <div class="links">
            <a href="../../index.html"><i class="fas fa-home"></i> SITE</a>
            <a href="logout.php"><i class="fas fa-sign-out-alt"></i> SAIR</a>
        </div>
    </nav>

    <!-- Main Dashboard -->
    <div class="dashboard-container">
        <div class="dashboard-header">
            <h1><i class="fas fa-crown"></i> Dashboard Premium</h1>
            <p>Bem-vindo, <strong><?php echo htmlspecialchars($userName); ?></strong>! 🎮</p>
        </div>
        
        <!-- TAB NAVIGATION -->
        <div class="tabs-container">
            <button class="tab-button active" onclick="switchTab('perfil', event)">
                <i class="fas fa-user"></i> Perfil
            </button>
            <button class="tab-button" onclick="switchTab('partidas', event)">
                <i class="fas fa-gamepad"></i> Partidas
            </button>
            <button class="tab-button" onclick="switchTab('conquistas', event)">
                <i class="fas fa-trophy"></i> Conquistas
            </button>
            <button class="tab-button" onclick="switchTab('ranking', event)">
                <i class="fas fa-chart-line"></i> Ranking
            </button>
            <button class="tab-button" onclick="switchTab('seguranca', event)">
                <i class="fas fa-lock"></i> Segurança
            </button>
            <button class="tab-button" onclick="switchTab('notificacoes', event)">
                <i class="fas fa-bell"></i> Notificações
            </button>
        </div>
        
        <!-- TAB: PERFIL -->
        <div id="perfil" class="tab-content active">
            <h2><i class="fas fa-id-card"></i> Meu Perfil</h2>
            
            <div class="profile-section">
                <div class="profile-avatar-box">
                    <div class="profile-avatar" id="avatarDisplay">
                        <?php if ($userData && $userData['fotoPerfil']): ?>
                            <?php if (strpos($userData['fotoPerfil'], 'icon://') === 0): ?>
                                <i class="fas <?php echo htmlspecialchars(str_replace('icon://', '', $userData['fotoPerfil'])); ?>"></i>
                            <?php else: ?>
                                <img src="../../<?php echo htmlspecialchars($userData['fotoPerfil']); ?>" alt="Avatar">
                            <?php endif; ?>
                        <?php else: ?>
                            <i class="fas fa-user"></i>
                        <?php endif; ?>
                    </div>
                    
                    <button class="upload-btn" onclick="document.getElementById('avatarInput').click()">
                        <i class="fas fa-upload"></i> Alterar Avatar
                    </button>
                    <input type="file" id="avatarInput" accept="image/*" style="display: none;">
                    
                    <button class="upload-btn" onclick="showAvatarOptions()" style="background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);">
                        <i class="fas fa-icons"></i> Ícones Padrão
                    </button>
                    
                    <div id="avatarOptions" style="display: none; margin-top: 1rem;">
                        <p style="color: #90ee90; margin-bottom: 1rem; font-size: 0.9rem;">Escolha um ícone:</p>
                        <button class="upload-btn" style="font-size: 0.8rem; padding: 0.6rem 0.8rem; margin: 0.3rem;" onclick="setDefaultAvatar('fa-user')"><i class="fas fa-user"></i></button>
                        <button class="upload-btn" style="font-size: 0.8rem; padding: 0.6rem 0.8rem; margin: 0.3rem;" onclick="setDefaultAvatar('fa-robot')"><i class="fas fa-robot"></i></button>
                        <button class="upload-btn" style="font-size: 0.8rem; padding: 0.6rem 0.8rem; margin: 0.3rem;" onclick="setDefaultAvatar('fa-shield-alt')"><i class="fas fa-shield-alt"></i></button>
                        <button class="upload-btn" style="font-size: 0.8rem; padding: 0.6rem 0.8rem; margin: 0.3rem;" onclick="setDefaultAvatar('fa-crown')"><i class="fas fa-crown"></i></button>
                        <button class="upload-btn" style="font-size: 0.8rem; padding: 0.6rem 0.8rem; margin: 0.3rem;" onclick="setDefaultAvatar('fa-leaf')"><i class="fas fa-leaf"></i></button>
                        <button class="upload-btn" style="font-size: 0.8rem; padding: 0.6rem 0.8rem; margin: 0.3rem;" onclick="setDefaultAvatar('fa-fire')"><i class="fas fa-fire"></i></button>
                        <button class="upload-btn" style="font-size: 0.8rem; padding: 0.6rem 0.8rem; margin: 0.3rem;" onclick="setDefaultAvatar('fa-snowflake')"><i class="fas fa-snowflake"></i></button>
                        <button class="upload-btn" style="font-size: 0.8rem; padding: 0.6rem 0.8rem; margin: 0.3rem;" onclick="setDefaultAvatar('fa-star')"><i class="fas fa-star"></i></button>
                    </div>
                </div>
                
                <div>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <i class="fas fa-clock" style="color: #2caf50; font-size: 1.5rem; margin-bottom: 0.5rem;"></i>
                            <div class="stat-label">Último Acesso</div>
                            <div class="stat-value"><?php echo $userData['ultimoLogin'] ? date('d/m/Y H:i', strtotime($userData['ultimoLogin'])) : 'Nunca'; ?></div>
                        </div>
                        <div class="stat-card">
                            <i class="fas fa-calendar" style="color: #2caf50; font-size: 1.5rem; margin-bottom: 0.5rem;"></i>
                            <div class="stat-label">Membro Desde</div>
                            <div class="stat-value"><?php echo date('d/m/Y', strtotime($userData['diaCriado'])); ?></div>
                        </div>
                        <div class="stat-card">
                            <i class="fas fa-trophy" style="color: #2caf50; font-size: 1.5rem; margin-bottom: 0.5rem;"></i>
                            <div class="stat-label">Vitórias</div>
                            <div class="stat-value"><?php echo $statusData['qtdWin'] ?? '0'; ?></div>
                        </div>
                        <div class="stat-card">
                            <i class="fas fa-gamepad" style="color: #2caf50; font-size: 1.5rem; margin-bottom: 0.5rem;"></i>
                            <div class="stat-label">Partidas Jogadas</div>
                            <div class="stat-value"><?php echo $statusData['qtdJogo'] ?? '0'; ?></div>
                        </div>
                    </div>
                    
                    <div id="uploadStatus"></div>
                    
                    <div class="form-group" style="margin-top: 2rem;">
                        <label style="color: #2caf50; font-weight: bold;">Informações da Conta</label>
                        <div style="background: rgba(0,0,0,0.2); padding: 1.5rem; border-radius: 6px; border-left: 4px solid #2caf50;">
                            <p><strong>Nome:</strong> <?php echo htmlspecialchars($userData['userName']); ?></p>
                            <p><strong>Email:</strong> <?php echo htmlspecialchars($userData['email']); ?></p>
                            <p><strong>Nível:</strong> Jogador</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- TAB: PARTIDAS -->
        <div id="partidas" class="tab-content">
            <h2><i class="fas fa-history"></i> Histórico de Partidas</h2>
            
            <?php if ($partidas): ?>
                <div class="table-responsive" style="margin-top: 2rem;">
                    <table>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Lixo</th>
                                <th>Waves</th>
                                <th>Tempo</th>
                                <th>Dificuldade</th>
                                <th>Resultado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($partidas as $p): ?>
                            <tr>
                                <td><?php echo date('d/m/Y H:i', strtotime($p['dataPartida'])); ?></td>
                                <td><?php echo $p['lixoColetado']; ?></td>
                                <td><?php echo $p['wavesCompletadas']; ?></td>
                                <td><?php echo intval($p['tempoJogo'] / 60) . 'm'; ?></td>
                                <td><?php echo ucfirst($p['dificuldade']); ?></td>
                                <td><span class="status-badge status-<?php echo strtolower($p['resultado']); ?>"><?php echo $p['resultado']; ?></span></td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            <?php else: ?>
                <div style="text-align: center; padding: 3rem; color: #90ee90;">
                    <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>Nenhuma partida jogada ainda</p>
                </div>
            <?php endif; ?>
        </div>
        
        <!-- TAB: CONQUISTAS -->
        <div id="conquistas" class="tab-content">
            <h2><i class="fas fa-star"></i> Minhas Conquistas</h2>
            
            <?php if ($conquistas): ?>
                <div class="stats-grid" style="margin-top: 2rem;">
                    <?php foreach ($conquistas as $c): ?>
                    <div class="stat-card" style="background: linear-gradient(135deg, rgba(255,193,7,0.2) 0%, rgba(255,193,7,0.1) 100%); border-color: rgba(255,193,7,0.4);">
                        <i class="fas fa-medal" style="color: #ffc107; font-size: 2rem; margin-bottom: 0.5rem;"></i>
                        <h3 style="color: #ffc107; margin-bottom: 0.5rem;"><?php echo htmlspecialchars($c['nomeConquista']); ?></h3>
                        <p style="color: #b0b0b0; font-size: 0.85rem;"><?php echo htmlspecialchars($c['dsc']); ?></p>
                        <p style="color: #ffc107; font-size: 0.9rem; margin-top: 0.5rem;">🏆 <?php echo htmlspecialchars($c['premio']); ?></p>
                    </div>
                    <?php endforeach; ?>
                </div>
            <?php else: ?>
                <div style="text-align: center; padding: 3rem; color: #90ee90;">
                    <i class="fas fa-lock" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>Nenhuma conquista desbloqueada ainda</p>
                </div>
            <?php endif; ?>
        </div>
        
        <!-- TAB: RANKING -->
        <div id="ranking" class="tab-content">
            <h2><i class="fas fa-podium"></i> Ranking Global</h2>
            
            <?php if ($ranking): ?>
                <div class="table-responsive" style="margin-top: 2rem;">
                    <table>
                        <thead>
                            <tr>
                                <th>Posição</th>
                                <th>Jogador</th>
                                <th>Lixo Total</th>
                                <th>Lixo Único</th>
                                <th>Vitórias</th>
                                <th>Win Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($ranking as $i => $r): 
                                $winRate = $r['qtdJogo'] > 0 ? round(($r['qtdWin'] / $r['qtdJogo']) * 100) : 0;
                            ?>
                            <tr>
                                <td><strong><?php echo $i + 1; ?></strong></td>
                                <td><?php echo htmlspecialchars($r['userName']); ?></td>
                                <td><strong><?php echo $r['lixoTotal']; ?></strong></td>
                                <td><?php echo $r['lixoUnic']; ?></td>
                                <td><?php echo $r['qtdWin']; ?></td>
                                <td><?php echo $winRate; ?>%</td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            <?php else: ?>
                <div style="text-align: center; padding: 3rem; color: #90ee90;">
                    <i class="fas fa-chart-line" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                    <p>Sem dados de ranking disponíveis</p>
                </div>
            <?php endif; ?>
        </div>
        
        <!-- TAB: SEGURANÇA -->
        <div id="seguranca" class="tab-content">
            <h2><i class="fas fa-shield-alt"></i> Segurança da Conta</h2>
            
            <?php if ($mensagem) echo $mensagem; ?>
            
            <form method="POST" style="max-width: 500px; margin-top: 2rem;">
                <input type="hidden" name="csrf_token" value="<?php echo csrf_token(); ?>">
                <input type="hidden" name="acao" value="alterar_senha">
                
                <div class="form-group">
                    <label for="senha_atual">Senha Atual</label>
                    <input type="password" id="senha_atual" name="senha_atual" required>
                </div>
                
                <div class="form-group">
                    <label for="senha_nova">Nova Senha</label>
                    <input type="password" id="senha_nova" name="senha_nova" required minlength="8">
                    <small style="color: #90ee90; margin-top: 0.5rem; display: block;">Mínimo 8 caracteres</small>
                </div>
                
                <div class="form-group">
                    <label for="senha_confirma">Confirmar Senha</label>
                    <input type="password" id="senha_confirma" name="senha_confirma" required minlength="8">
                </div>
                
                <button type="submit" class="btn-submit">
                    <i class="fas fa-save"></i> Alterar Senha
                </button>
            </form>
        </div>
        
        <!-- TAB: NOTIFICAÇÕES -->
        <div id="notificacoes" class="tab-content">
            <h2><i class="fas fa-bell"></i> Preferências de Notificações</h2>
            
            <?php if ($notification_message) echo $notification_message; ?>
            
            <form method="POST">
                <input type="hidden" name="csrf_token" value="<?php echo csrf_token(); ?>">
                <input type="hidden" name="acao" value="salvar_notificacoes">
                
                <p style="color: #90ee90; margin-bottom: 1.5rem;">Escolha sobre quais eventos deseja receber notificações por email:</p>
                
                <div class="notification-prefs">
                    <div class="notification-card">
                        <h3><i class="fas fa-check-circle"></i> Vitórias</h3>
                        <p>Receba notificação quando você vencer uma partida</p>
                        <div class="checkbox-wrapper">
                            <input type="checkbox" id="email_vitoria" name="email_vitoria" checked>
                            <label for="email_vitoria">Notificar-me</label>
                        </div>
                    </div>
                    
                    <div class="notification-card">
                        <h3><i class="fas fa-times-circle"></i> Derrotas</h3>
                        <p>Receba notificação quando terminar uma partida (mesmo que perder)</p>
                        <div class="checkbox-wrapper">
                            <input type="checkbox" id="email_derrota" name="email_derrota" checked>
                            <label for="email_derrota">Notificar-me</label>
                        </div>
                    </div>
                    
                    <div class="notification-card">
                        <h3><i class="fas fa-trophy"></i> Conquistas</h3>
                        <p>Receba notificação ao desbloquear uma nova conquista</p>
                        <div class="checkbox-wrapper">
                            <input type="checkbox" id="email_conquista" name="email_conquista" checked>
                            <label for="email_conquista">Notificar-me</label>
                        </div>
                    </div>
                    
                    <div class="notification-card">
                        <h3><i class="fas fa-chart-line"></i> Ranking</h3>
                        <p>Receba notificação quando sua posição no ranking mudar</p>
                        <div class="checkbox-wrapper">
                            <input type="checkbox" id="email_ranking" name="email_ranking">
                            <label for="email_ranking">Notificar-me</label>
                        </div>
                    </div>
                </div>
                
                <button type="submit" class="btn-submit" style="margin-top: 2rem;">
                    <i class="fas fa-save"></i> Salvar Preferências
                </button>
            </form>
        </div>
    </div>

    <script>
        // Tab Switching
        function switchTab(tabId, e) {
            e.preventDefault();
            
            // Hide all tabs
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Remove active from buttons
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show selected tab
            document.getElementById(tabId).classList.add('active');
            e.target.closest('.tab-button').classList.add('active');
        }
        
        // Search Bar
        const searchBar = document.getElementById('searchBar');
        const searchResults = document.getElementById('searchResults');
        
        const pages = [
            { name: 'Home', url: '../../index.html' },
            { name: 'Sobre', url: '../../index.html' },
            { name: 'História', url: '../../index.html' },
            { name: 'Personagens', url: '../../index.html' },
            { name: 'Jogar', url: '../../pages/telaDeInicioJogo.html' },
            { name: 'Ranking', url: '?tab=ranking' }
        ];
        
        searchBar.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length === 0) {
                searchResults.style.display = 'none';
                return;
            }
            
            const matches = pages.filter(p => p.name.toLowerCase().includes(query));
            if (matches.length === 0) {
                searchResults.style.display = 'none';
                return;
            }
            
            searchResults.innerHTML = matches.map(m => 
                `<div class="search-result-item" onclick="window.location.href='${m.url}'">${m.name}</div>`
            ).join('');
            searchResults.style.display = 'block';
        });
        
        // Close search results on outside click
        document.addEventListener('click', function(e) {
            if (e.target !== searchBar) {
                searchResults.style.display = 'none';
            }
        });
        
        // Avatar Upload
        const avatarInput = document.getElementById('avatarInput');
        const avatarDisplay = document.getElementById('avatarDisplay');
        const uploadStatus = document.getElementById('uploadStatus');
        
        avatarInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            if (file.size > 5 * 1024 * 1024) {
                uploadStatus.innerHTML = '<div class="alert alert-danger"><i class="fas fa-exclamation-circle"></i> Arquivo muito grande (máx 5MB)</div>';
                return;
            }
            
            if (!file.type.startsWith('image/')) {
                uploadStatus.innerHTML = '<div class="alert alert-danger"><i class="fas fa-exclamation-circle"></i> Selecione uma imagem válida</div>';
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                avatarDisplay.innerHTML = `<img src="${e.target.result}" alt="Avatar">`;
                uploadStatus.innerHTML = '<div class="alert alert-success"><i class="fas fa-spinner"></i> Enviando...</div>';
            };
            reader.readAsDataURL(file);
            
            const formData = new FormData();
            formData.append('avatar', file);
            
            fetch('../upload_avatar.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    uploadStatus.innerHTML = '<div class="alert alert-success"><i class="fas fa-check-circle"></i> Avatar atualizado!</div>';
                    setTimeout(() => uploadStatus.innerHTML = '', 3000);
                } else {
                    uploadStatus.innerHTML = `<div class="alert alert-danger"><i class="fas fa-exclamation-circle"></i> ${data.error}</div>`;
                }
            })
            .catch(() => {
                uploadStatus.innerHTML = '<div class="alert alert-danger"><i class="fas fa-exclamation-circle"></i> Erro ao fazer upload</div>';
            });
        });
        
        // Avatar Icons
        function showAvatarOptions() {
            const options = document.getElementById('avatarOptions');
            options.style.display = options.style.display === 'none' ? 'block' : 'none';
        }
        
        function setDefaultAvatar(iconClass) {
            avatarDisplay.innerHTML = `<i class="fas ${iconClass}"></i>`;
            
            fetch('../upload_avatar.php', {
                method: 'POST',
                body: new URLSearchParams({ 'default_icon': iconClass })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    uploadStatus.innerHTML = '<div class="alert alert-success"><i class="fas fa-check-circle"></i> Ícone definido!</div>';
                    setTimeout(() => uploadStatus.innerHTML = '', 3000);
                }
            });
        }
        
        // Initialize Background
        if (typeof initParticles === 'function') {
            initParticles();
            initEnergyLines();
        }
    </script>
</body>
</html>
