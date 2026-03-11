<?php
require_once 'config.php';
start_secure_session();

// verifica se veio do formulário
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: login.php');
    exit;
}

// valida token CSRF
if (!validate_csrf_token($_POST['csrf_token'] ?? '')) {
    header('Location: login.php?error=csrf');
    exit;
}

// captura dados
$email = strtolower(trim(string: $_POST['email'] ?? ''));
$senha = $_POST['senha'] ?? '';


// valida dados
if (empty($email) || empty($senha) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: login.php?error=1');
    exit;
}

// criptografa senha usando MD5
$senhaHash = md5($senha);

// busca usuário no banco
$stmt = $pdo->prepare("
SELECT idUsuario, nomeUsuario, senhaHash, nivelAcesso 
FROM usuario 
WHERE emailUsuario = ? AND senhaHash = ? AND ativo = 1
LIMIT 1
");

$stmt->execute([$email, $senhaHash]);
$user = $stmt->fetch();

// verifica se encontrou usuário
if ($user) {

    // evita roubo de sessão
    session_regenerate_id(true);

    // cria sessão do usuário
    $_SESSION['user'] = [
        'id' => $user['idUsuario'],
        'nome' => $user['nomeUsuario'],
        'nivel' => $user['nivelAcesso'],
        'token' => ($user['idUsuario']), // token simples
        'last_activity' => time()
    ];
    var_dump($_SESSION['user']);
    // remove token csrf antigo
    unset($_SESSION['csrf_token'], $_SESSION['csrf_token_time']);

    // redireciona para área logada
    header('Location: User/dashboard.php');
    exit;

} 
else {

    // login incorreto
    header('Location: login.php?login=erro');
    exit;
}
?>