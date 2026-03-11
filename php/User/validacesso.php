<?php
// Importa a configuração do sistema (conexão com banco e funções de segurança)
require_once '../config.php';

// Inicia a sessão segura
start_secure_session();

// Verifica se existe usuário na sessão (se está logado)
if (empty($_SESSION['user'])) {

    // Caso não esteja logado, mostra mensagem de erro
    echo "<h2>Você não está logado.</h2>";

    // Botão para tentar novamente
    echo '<a href="login.php">
            <button>Tente novamente</button>
          </a>';

    exit;
}

?>
