#!/usr/bin/env php
<?php
/**
 * Script de Validação da Integração do Dashboard
 * 
 * Execute este script para validar se todos os endpoints e arquivos estão prontos
 * 
 * Uso:
 * php -r "include 'validation_checklist.php';"
 * 
 * Ou adicione ao seu CI/CD pipeline
 */

echo "\n🔍 VALIDAÇÃO DO SISTEMA DE DASHBOARD\n";
echo "=====================================\n\n";

$baseDir = __DIR__ . '/';
$checks = [];

// ===== VERIFICAR ENDPOINTS =====
echo "📌 Verificando Endpoints API...\n";

$endpoints = [
    'php/api/user_stats.php',
    'php/api/user_matches.php',
    'php/api/user_rank.php',
    'php/api/global_rank.php',
    'php/api/get_predefined_avatars.php',
];

foreach ($endpoints as $file) {
    $path = $baseDir . $file;
    if (file_exists($path)) {
        echo "  ✅ {$file}\n";
        $checks['api_' . str_replace(['/', '.'], ['_', '_'], $file)] = true;
    } else {
        echo "  ❌ {$file} - NÃO ENCONTRADO\n";
        $checks['api_' . str_replace(['/', '.'], ['_', '_'], $file)] = false;
    }
}

// ===== VERIFICAR SCRIPTS JS =====
echo "\n📌 Verificando Scripts JavaScript...\n";

$jsFiles = [
    'js/dashboard-autoupdate.js',
    'js/jogo/functions/other/checkGameOver.js',
];

foreach ($jsFiles as $file) {
    $path = $baseDir . $file;
    if (file_exists($path)) {
        echo "  ✅ {$file}\n";
        $checks['js_' . basename($file, '.js')] = true;
    } else {
        echo "  ❌ {$file} - NÃO ENCONTRADO\n";
        $checks['js_' . basename($file, '.js')] = false;
    }
}

// ===== VERIFICAR PÁGINAS HTML =====
echo "\n📌 Verificando Páginas...\n";

$pages = [
    'pages/selecao_avatar.html',
    'php/User/dashboard_novo.php',
];

foreach ($pages as $file) {
    $path = $baseDir . $file;
    if (file_exists($path)) {
        echo "  ✅ {$file}\n";
        $checks['page_' . basename($file, '.html')] = true;
    } else {
        echo "  ❌ {$file} - NÃO ENCONTRADO\n";
        $checks['page_' . basename($file, '.html')] = false;
    }
}

// ===== VERIFICAR ALTERAÇÕES EM ARQUIVOS EXISTENTES =====
echo "\n📌 Verificando Alterações em Arquivos Existentes...\n";

// Verifica se checkGameOver.js tem 'jogoJáFinalizado'
$checkGameOverPath = $baseDir . 'js/jogo/functions/other/checkGameOver.js';
if (file_exists($checkGameOverPath)) {
    $content = file_get_contents($checkGameOverPath);
    if (strpos($content, 'jogoJáFinalizado') !== false && strpos($content, 'resetarStatusPartida') !== false) {
        echo "  ✅ checkGameOver.js - Melhoramentos detectados\n";
        $checks['improved_checkGameOver'] = true;
    } else {
        echo "  ⚠️  checkGameOver.js - Pode não estar completamente atualizado\n";
        $checks['improved_checkGameOver'] = false;
    }
}

// Verifica se main.js tem resetarStatusPartida
$mainPath = $baseDir . 'js/jogo/main.js';
if (file_exists($mainPath)) {
    $content = file_get_contents($mainPath);
    if (strpos($content, 'resetarStatusPartida') !== false) {
        echo "  ✅ main.js - resetarStatusPartida() adicionado\n";
        $checks['main_reset_status'] = true;
    } else {
        echo "  ⚠️  main.js - resetarStatusPartida() pode não estar presente\n";
        $checks['main_reset_status'] = false;
    }
}

// Verifica se get_avatar.php suporta predefined
$getAvatarPath = $baseDir . 'php/get_avatar.php';
if (file_exists($getAvatarPath)) {
    $content = file_get_contents($getAvatarPath);
    if (strpos($content, 'predefined://') !== false) {
        echo "  ✅ get_avatar.php - Suporte a avatares predefinidos detectado\n";
        $checks['avatar_predefined'] = true;
    } else {
        echo "  ❌ get_avatar.php - Não foi atualizado para avatares predefinidos\n";
        $checks['avatar_predefined'] = false;
    }
}

// ===== VERIFICAR BANCO DE DADOS =====
echo "\n📌 Verificando Configuração do Banco de Dados...\n";

if (file_exists($baseDir . 'php/config.php')) {
    echo "  ✅ config.php - Arquivo de configuração encontrado\n";
    $checks['db_config'] = true;
    
    // Tenta conectar
    try {
        require_once $baseDir . 'php/config.php';
        
        // Verifica se PDO está disponível
        if ($pdo) {
            echo "  ✅ PDO - Conexão configurada\n";
            $checks['pdo_available'] = true;
            
            // Verifica tabelas necessárias
            $requiredTables = ['user', 'userStatus', 'partidas'];
            foreach ($requiredTables as $table) {
                try {
                    $stmt = $pdo->query("SELECT 1 FROM $table LIMIT 1");
                    echo "  ✅ Tabela '$table' - Encontrada\n";
                    $checks['table_' . $table] = true;
                } catch (Exception $e) {
                    echo "  ⚠️  Tabela '$table' - Pode não existir\n";
                    $checks['table_' . $table] = false;
                }
            }
        }
    } catch (Exception $e) {
        echo "  ⚠️  Erro ao conectar ao banco: " . $e->getMessage() . "\n";
        $checks['db_connection'] = false;
    }
} else {
    echo "  ❌ config.php - Arquivo não encontrado\n";
    $checks['db_config'] = false;
}

// ===== RESUMO =====
echo "\n" . str_repeat("=", 40) . "\n";
echo "📊 RESUMO\n";
echo str_repeat("=", 40) . "\n\n";

$totalChecks = count($checks);
$passedChecks = count(array_filter($checks, fn($v) => $v === true));
$failedChecks = $totalChecks - $passedChecks;

echo "Total: {$totalChecks} verificações\n";
echo "✅ Passou: {$passedChecks}\n";
echo "❌ Falhou: {$failedChecks}\n";
echo "📊 Taxa de sucesso: " . round(($passedChecks / $totalChecks) * 100, 1) . "%\n\n";

if ($failedChecks === 0) {
    echo "✨ TUDO PRONTO! Sistema de Dashboard está completamente integrado.\n\n";
} else {
    echo "⚠️  Verifique os itens marcados com ❌ acima.\n";
    echo "📖 Consulte INTEGRACAO_DASHBOARD.md para mais informações.\n\n";
}

// ===== RECOMENDAÇÕES =====
echo "💡 PRÓXIMOS PASSOS:\n";
echo "  1. Incluir <script src=\"js/dashboard-autoupdate.js\"></script> nas páginas do jogo\n";
echo "  2. Acessar /php/User/dashboard_novo.php após login\n";
echo "  3. Testar seleção de avatar em /pages/selecao_avatar.html\n";
echo "  4. Jogar uma partida completa e verificar se os dados são registrados\n";
echo "  5. Manter dashboard aberto e verificar auto-atualização\n\n";

echo "📚 Documentação: Leia INTEGRACAO_DASHBOARD.md\n\n";
?>
