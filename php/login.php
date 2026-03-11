<?php
require_once 'config.php';
start_secure_session();

// Se já logado, redireciona
if (!empty($_SESSION['user'])) {
  header('Location: User/dashboard.php'); // Altere para sua página protegida
    exit;
}



?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <title>Login - Gaea Protocol</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Megrim&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

<body>
    <nav class="top-nav">
        <div class="logo">GAEA PROTOCOL</div>
        <div class="links">
            <a href="index.php">CADASTRAR</a>
        </div>
    </nav>

    <div class="form-container">
        <h1>Login</h1>

        <?php if (!empty($_GET['success'])): ?>
            <p style="color: green;">Cadastro realizado. Faça login.</p>
        <?php endif; ?>


        <?php if (!empty($_GET['expired'])): ?>
            <p class="erro-msg">Sessão expirada.</p>
        <?php endif; ?>


        <!--    inserir senha e email -->
        <form method="POST" action="authenticate.php">
            <input type="hidden" name="csrf_token" value="<?= csrf_token() ?>">

            <label>Email</label>
            <input type="email" name="email" required>

            <label>Senha</label>
            <div class="password-wrapper">
                <input type="password" name="senha" required>
                <i class="fas fa-eye toggle-password" onclick="togglePassword(this)"></i>
            </div>

            <?php
            if (isset($_GET['login'])  && $_GET['login'] === 'erro') {
            ?>
             <div class="text-danger"> Usuario ou senha invalido(s)!</div> 
            <?php } ?> 

            



            <button type="submit" class="botao">Entrar</button>
        </form>

        <div style="margin-top: 15px; text-align: center;">
            <a href="recover.php" style="color: #fff;">Esqueceu a senha?</a>
        </div>
    </div>
    <!--  exibir senha  -->
    <script>
        function togglePassword(btn) {
            const wrapper = btn.parentElement;
            const input = wrapper.querySelector('input');
            if (input.type === 'password') {
                input.type = 'text';
                btn.classList.remove('fa-eye');
                btn.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                btn.classList.remove('fa-eye-slash');
                btn.classList.add('fa-eye');
            }
        }
    </script>
</body>

</html>