<?php
require_once 'config.php';
start_secure_session();

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!validate_csrf_token($_POST['csrf_token'] ?? '')) {
        $error = 'Erro de segurança (CSRF).';
    } else {
        $nome  = trim($_POST['nome'] ?? '');
        $email = strtolower(trim($_POST['email'] ?? ''));
        $dataNascimento = !empty($_POST['dataNascimento']) ? $_POST['dataNascimento'] : NULL;
        $senha = $_POST['senha'] ?? '';
        $confirmaSenha = $_POST['confirma_senha'] ?? '';

        if (empty($nome) || empty($email) || empty($senha)) {
            $error = 'Preencha todos os campos obrigatórios.';
        } elseif (strlen($nome) > 50) {
            $error = 'Nome muito longo (máximo 50 caracteres).';
        } elseif (strlen($email) > 100) {
            $error = 'Email muito longo (máximo 100 caracteres).';
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $error = 'Email inválido.';
        } elseif (strlen($senha) < 8) {
            $error = 'Senha deve ter pelo menos 8 caracteres.';
        } elseif ($senha !== $confirmaSenha) {
            $error = 'As senhas não conferem.';
        } else {
            $senha_hash = password_hash($senha, PASSWORD_BCRYPT, ['cost' => 12]);
            
            try {
                $stmt = $pdo->prepare(
                    'INSERT INTO user 
                    (userName, email, senha, dataNascimento, ultimoLogin, diaCriado)
                    VALUES (?, ?, ?, ?, NOW(), NOW())'
                );

                $stmt->execute([$nome, $email, $senha_hash, $dataNascimento]);

                header('Location: login.php?success=cadastro');
                exit;

            } catch (PDOException $e) {
                if ($e->getCode() == '23000') {
                    $error = 'Este email já está cadastrado.';
                } else {
                    error_log($e->getMessage());
                    $error = 'Erro ao cadastrar. Tente novamente.';
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
    <title>Cadastro - Gaea Protocol</title>
    <link rel="stylesheet" href="../css/reset.css">
    <link rel="stylesheet" href="../css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Megrim&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="../js/script.js" defer></script>
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
        <a href="login.php">LOGIN</a>
    </div>
</nav>

<div class="form-container">
    <div class="form-box">
        <h1><i class="fas fa-user-plus"></i> Criar Conta</h1>
        <p class="form-subtitle">Junte-se à luta pela restauração do planeta</p>

        <?php if ($error): ?>
            <div class="error-msg">
                <i class="fas fa-exclamation-circle"></i>
                <?php echo sanitize($error); ?>
            </div>
        <?php endif; ?>

        <form method="POST">
            <input type="hidden" name="csrf_token" value="<?php echo csrf_token(); ?>">

            <div class="form-group">
                <label for="nome"><i class="fas fa-user"></i> Usuário</label>
                <input type="text" id="nome" name="nome" placeholder="Seu nome" required maxlength="50" autocomplete="username">
            </div>

            <div class="form-group">
                <label for="email"><i class="fas fa-envelope"></i> Email</label>
                <input type="email" id="email" name="email" placeholder="seu@email.com" required maxlength="100" autocomplete="email">
            </div>

            <div class="form-group">
                <label for="dataNascimento"><i class="fas fa-birthday-cake"></i> Data de Nascimento <span style="color: #888; font-size: 0.85em;">(Opcional)</span></label>
                <input type="date" id="dataNascimento" name="dataNascimento" autocomplete="bday">
            </div>

            <div class="form-group">
                <label for="senha"><i class="fas fa-key"></i> Senha</label>
                <div class="password-wrapper">
                    <input type="password" id="senha" name="senha" placeholder="••••••••" required minlength="8" autocomplete="new-password">
                    <button type="button" class="toggle-password" onclick="togglePassword(this)">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
                <small>Mínimo 8 caracteres</small>
            </div>

            <div class="form-group">
                <label for="confirma_senha"><i class="fas fa-key"></i> Confirmar Senha</label>
                <div class="password-wrapper">
                    <input type="password" id="confirma_senha" name="confirma_senha" placeholder="••••••••" required minlength="8" autocomplete="new-password">
                    <button type="button" class="toggle-password" onclick="togglePassword(this)">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>

            <button type="submit" class="botao">
                <i class="fas fa-check"></i> Criar Conta
            </button>
        </form>

        <div class="form-links">
            <p>Já tem uma conta? <a href="login.php" class="link">Faça login aqui</a></p>
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