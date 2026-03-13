<?php
require_once 'config.php';
start_secure_session();

// Se já logado, redireciona
if (!empty($_SESSION['user'])) {
    header('Location: User/dashboard.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Gaea Protocol</title>
    <link rel="stylesheet" href="../css/reset.css">
    <link rel="stylesheet" href="../css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Megrim&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="../js/script.js" defer></script>
    
    <style>
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
            margin-left: auto; /* Move links to the right */
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
        
        body {
            padding-top: 80px;
        }
    </style>
</head>
<body>
    <!-- background animations container -->
    <div class="background-system">
        <div class="background-base"></div>
        <div class="circuit-grid"></div>
        <div class="energy-lines" id="energyLinesContainer"></div>
        <div class="particles-container" id="particlesContainer"></div>
        <div class="scanner-effect"></div>
        <div class="distortion-layer"></div>
    </div>

    <nav class="top-nav">
        <div class="logo" onclick="window.location.href='../../index.html'" style="cursor: pointer;">GAEA PROTOCOL</div>
        <div class="links">
            <a href="../index.html">VOLTAR AO SITE</a>
            <a href="index.php">CADASTRAR</a>
        </div>
    </nav>

    <div class="form-container">
        <div class="form-box">
            <h1><i class="fas fa-lock"></i> Login</h1>

            <?php if (!empty($_GET['success']) && $_GET['success'] === 'cadastro'): ?>
                <div class="success-msg">
                    <i class="fas fa-check-circle"></i>
                    Cadastro realizado com sucesso! Faça login para continuar.
                </div>
            <?php endif; ?>

            <?php if (isset($_GET['logout']) && $_GET['logout'] === 'sucesso'): ?>
                <div class="success-msg">
                    <i class="fas fa-check-circle"></i>
                    Você foi desconectado com sucesso!
                </div>
            <?php endif; ?>

            <?php if (!empty($_GET['expired'])): ?>
                <div class="error-msg">
                    <i class="fas fa-exclamation-circle"></i>
                    Sua sessão expirou. Por favor, faça login novamente.
                </div>
            <?php endif; ?>

            <?php if (isset($_GET['login']) && $_GET['login'] === 'erro'): ?>
                <div class="error-msg">
                    <i class="fas fa-times-circle"></i>
                    Usuário ou senha inválido(s)!
                </div>
            <?php endif; ?>

            <?php if (isset($_GET['error']) && $_GET['error'] === 'schema'): ?>
                <div class="error-msg">
                    <i class="fas fa-exclamation-triangle"></i>
                    Erro de configuração: coluna de senha está incorreta. Rode <a href="diagnosico.php">diagnóstico</a>.
                </div>
            <?php endif; ?>

            <?php if (isset($_GET['error']) && $_GET['error'] === 'default_password'): ?>
                <div class="error-msg">
                    <i class="fas fa-lock"></i>
                    Você está usando a senha padrão. Por favor, <a href="recover.php">restaure sua conta</a>.
                </div>
            <?php endif; ?>

            <form method="POST" action="authenticate.php">
                <input type="hidden" name="csrf_token" value="<?php echo csrf_token(); ?>">

                <div class="form-group">
                    <label for="email"><i class="fas fa-envelope"></i> Email</label>
                    <input type="email" id="email" name="email" placeholder="seu@email.com" required autocomplete="email">
                </div>

                <div class="form-group">
                    <label for="senha"><i class="fas fa-key"></i> Senha</label>
                    <div class="password-wrapper">
                        <input type="password" id="senha" name="senha" placeholder="••••••••" required autocomplete="current-password">
                        <button type="button" class="toggle-password" onclick="togglePassword(this)">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>

                <button type="submit" class="botao">
                    <i class="fas fa-sign-in-alt"></i> Entrar
                </button>
            </form>

            <div class="form-links">
                <a href="recover.php" class="link"><i class="fas fa-redo"></i> Esqueceu a senha?</a>
                <span>|</span>
                <a href="index.php" class="link"><i class="fas fa-user-plus"></i> Criar conta</a>
            </div>
        </div>
    </div>

    <script>
        function togglePassword(btn) {
            const wrapper = btn.parentElement;
            const input = wrapper.querySelector('input');
            const icon = btn.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        }
    </script>
</body>
</html>