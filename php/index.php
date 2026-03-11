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
        $senha = $_POST['senha'] ?? '';

        if (empty($nome) || empty($email) || empty($senha)) {
            $error = 'Preencha todos os campos.';

        } elseif (strlen($nome) > 50) {
            $error = 'Nome muito longo.';

        } elseif (strlen($email) > 100) {
            $error = 'Email muito longo.';

        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $error = 'Email inválido.';

        } elseif (strlen($senha) < 8) {
            $error = 'Senha deve ter pelo menos 8 caracteres.';

        } else {

            // $senha_hash = password_hash($senha, PASSWORD_BCRYPT, ['cost' => 12]);
            $senha_hash = MD5($senha);
            
            try {

                $stmt = $pdo->prepare(
                    'INSERT INTO usuario 
                    (nomeUsuario, emailUsuario, senhaHash, nivelAcesso, dataCadastro, ativo)
                    VALUES (?, ?, ?, "usuario", NOW(), 1)'
                );

                $stmt->execute([$nome, $email, $senha_hash]);

                header('Location: login.php?success=cadastro');
                exit;

            } catch (PDOException $e) {

                if ($e->getCode() == '23000') {
                    $error = 'Email já cadastrado.';
                } else {
                    error_log($e->getMessage());
                    $error = 'Erro interno. Tente novamente.';
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
<title>Cadastro - Gaea Protocol</title>
<link rel="stylesheet" href="style.css">
<link href="https://fonts.googleapis.com/css2?family=Megrim&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

<body>

<nav class="top-nav">
<div class="logo">GAEA PROTOCOL</div>
<div class="links">
<a href="login.php">LOGIN</a>
</div>
</nav>

<div class="form-container">
<h1>Cadastre-se</h1>
<!-- Criação do cadastro  -->
<?php if ($error): ?>
<p class="erro-msg"><?= sanitize($error) ?></p>
<?php endif; ?>

<form method="POST">

<input type="hidden" name="csrf_token" value="<?= csrf_token() ?>">

<label>Usuário</label>
<input type="text" name="nome" required>

<label>Email</label>
<input type="email" name="email" required>

<label>Senha</label>
<div class="password-wrapper">
<input type="password" name="senha" required minlength="8">
<i class="fas fa-eye toggle-password" onclick="togglePassword(this)"></i>
</div>

<button type="submit" class="botao">Cadastrar</button>

</form>
</div>

<script>
function togglePassword(btn){

const wrapper = btn.parentElement
const input = wrapper.querySelector('input')

if(input.type === 'password'){
input.type = 'text'
btn.classList.remove('fa-eye')
btn.classList.add('fa-eye-slash')
}else{
input.type = 'password'
btn.classList.remove('fa-eye-slash')
btn.classList.add('fa-eye')
}

}
</script>

</body>
</html>