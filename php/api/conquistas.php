<?php
/**
 * ============================================================
 * API REST DE CONQUISTAS (Achievements)
 * ============================================================
 * Arquivo: /php/api/conquistas.php
 * 
 * Endpoints:
 *   GET  /conquistas.php?usuario_id=42
 *        → Retorna todas as conquistas com status de desbloqueio
 *   
 *   POST /conquistas.php
 *        → Registra conquistas desbloqueadas em uma sessão
 * 
 * Autenticação: Obrigatória (sessão PHP)
 * ============================================================
 */

// ============================================================
// 1. INICIALIZAÇÃO E VALIDAÇÃO
// ============================================================

// Incluir config ANTES de headers e session
require_once(__DIR__ . '/../config.php');

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

// Iniciar sessão
session_start();

// ============================================================
// 2. DEFINIÇÃO DE CONQUISTAS (27 total)
// ============================================================
// Esta lista é a "fonte de verdade" das conquistas
// Também deve estar no banco de dados (migration_conquistas_api.sql)

$CONQUISTAS = [
    // BOSSES (1-13)
    1 => [
        'id' => 1,
        'nome' => 'CAÇADOR',
        'descricao' => 'Derrote Boss Alfa',
        'categoria' => 'boss',
        'personagem' => 'Qualquer',
        'criterio' => 'Derrotar boss_alfa'
    ],
    2 => [
        'id' => 2,
        'nome' => 'PESCANDO',
        'descricao' => 'Derrote Boss Kraken',
        'categoria' => 'boss',
        'personagem' => 'Qualquer',
        'criterio' => 'Derrotar boss_kraken'
    ],
    3 => [
        'id' => 3,
        'nome' => 'HEREGE',
        'descricao' => 'Derrote Boss Paládio',
        'categoria' => 'boss',
        'personagem' => 'Qualquer',
        'criterio' => 'Derrotar boss_paladdum'
    ],
    4 => [
        'id' => 4,
        'nome' => 'OBSOLETO',
        'descricao' => 'Derrote Boss Valk',
        'categoria' => 'boss',
        'personagem' => 'Qualquer',
        'criterio' => 'Derrotar boss_valk'
    ],
    5 => [
        'id' => 5,
        'nome' => 'UM SEGREDO',
        'descricao' => 'Derrote Boss Solice',
        'categoria' => 'boss',
        'personagem' => 'Qualquer',
        'criterio' => 'Derrotar boss_solice'
    ],
    6 => [
        'id' => 6,
        'nome' => 'REI MAGO',
        'descricao' => 'Derrote Boss Ayla',
        'categoria' => 'boss',
        'personagem' => 'Qualquer',
        'criterio' => 'Derrotar boss_ayla'
    ],
    7 => [
        'id' => 7,
        'nome' => 'SALVADOR ECO',
        'descricao' => 'Derrote Boss IA',
        'categoria' => 'boss',
        'personagem' => 'Qualquer',
        'criterio' => 'Derrotar boss_ia'
    ],
    8 => [
        'id' => 8,
        'nome' => 'LIMPANDO A POEIRA',
        'descricao' => 'Derrote Boss Nêmora',
        'categoria' => 'boss',
        'personagem' => 'Qualquer',
        'criterio' => 'Derrotar boss_nemora'
    ],
    9 => [
        'id' => 9,
        'nome' => 'HORA DO TRUCO',
        'descricao' => 'Derrote Boss Svetlana',
        'categoria' => 'boss',
        'personagem' => 'Qualquer',
        'criterio' => 'Derrotar boss_svetlana'
    ],
    10 => [
        'id' => 10,
        'nome' => 'CORROMPIDO',
        'descricao' => 'Derrote Boss Pedro',
        'categoria' => 'boss',
        'personagem' => 'Qualquer',
        'criterio' => 'Derrotar boss_pedro'
    ],
    11 => [
        'id' => 11,
        'nome' => 'CHESS',
        'descricao' => 'Derrote Boss Belinda',
        'categoria' => 'boss',
        'personagem' => 'Qualquer',
        'criterio' => 'Derrotar boss_belinda'
    ],
    12 => [
        'id' => 12,
        'nome' => 'DESCANSO HEROICO',
        'descricao' => 'Derrote Boss Guinevere',
        'categoria' => 'boss',
        'personagem' => 'Qualquer',
        'criterio' => 'Derrotar boss_guinevere'
    ],
    13 => [
        'id' => 13,
        'nome' => 'TRATANDO O MAR',
        'descricao' => 'Derrote Boss Isla',
        'categoria' => 'boss',
        'personagem' => 'Qualquer',
        'criterio' => 'Derrotar boss_isla'
    ],
    
    // ESCUDO (14-15)
    14 => [
        'id' => 14,
        'nome' => 'REFORÇADO',
        'descricao' => 'Na mesma partida consiga 200 de escudo',
        'categoria' => 'escudo',
        'personagem' => 'Qualquer',
        'criterio' => 'Acumular 200 escudo'
    ],
    15 => [
        'id' => 15,
        'nome' => 'BRILHANTE',
        'descricao' => 'Na mesma partida consiga 400 de escudo',
        'categoria' => 'escudo',
        'personagem' => 'Qualquer',
        'criterio' => 'Acumular 400 escudo'
    ],
    
    // VIDA (16-18)
    16 => [
        'id' => 16,
        'nome' => 'VITALÍCIO',
        'descricao' => 'Na mesma partida consiga ter mais de 300 de vida',
        'categoria' => 'vida',
        'personagem' => 'Qualquer',
        'criterio' => 'Ter 300+ HP'
    ],
    17 => [
        'id' => 17,
        'nome' => 'GIGANTE',
        'descricao' => 'Na mesma partida consiga ter mais de 400 de vida',
        'categoria' => 'vida',
        'personagem' => 'Qualquer',
        'criterio' => 'Ter 400+ HP'
    ],
    18 => [
        'id' => 18,
        'nome' => 'IMORTAL',
        'descricao' => 'Na mesma partida consiga ter mais de 500 de vida',
        'categoria' => 'vida',
        'personagem' => 'Qualquer',
        'criterio' => 'Ter 500+ HP'
    ],
    
    // RECICLAGEM (19-23)
    19 => [
        'id' => 19,
        'nome' => 'O COMEÇO',
        'descricao' => 'Na mesma partida consiga reciclar um total de 150 lixos',
        'categoria' => 'reciclagem',
        'personagem' => 'Gaea',
        'criterio' => 'Reciclar 150 lixo'
    ],
    20 => [
        'id' => 20,
        'nome' => 'LIMPANDO O MUNDO',
        'descricao' => 'Na mesma partida consiga reciclar um total de 250 lixos',
        'categoria' => 'reciclagem',
        'personagem' => 'Gaea',
        'criterio' => 'Reciclar 250 lixo'
    ],
    21 => [
        'id' => 21,
        'nome' => 'TRATAMENTO DA TERRA',
        'descricao' => 'Na mesma partida consiga reciclar um total de 350 lixos',
        'categoria' => 'reciclagem',
        'personagem' => 'Gaea',
        'criterio' => 'Reciclar 350 lixo'
    ],
    22 => [
        'id' => 22,
        'nome' => 'GRANDE ATITUDE',
        'descricao' => 'Na mesma partida consiga reciclar um total de 450 lixos',
        'categoria' => 'reciclagem',
        'personagem' => 'Gaea',
        'criterio' => 'Reciclar 450 lixo'
    ],
    23 => [
        'id' => 23,
        'nome' => 'RECICLANDO O FUTURO',
        'descricao' => 'Na mesma partida consiga reciclar um total de 600 lixos',
        'categoria' => 'reciclagem',
        'personagem' => 'Gaea',
        'criterio' => 'Reciclar 600 lixo'
    ],
    
    // SINERGIA E OUTROS (24-27)
    24 => [
        'id' => 24,
        'nome' => 'SINERGIA ELEMENTAL',
        'descricao' => 'Tenha 10 ou mais cartas de qualquer tipo ELEMENTAL no mesmo deck',
        'categoria' => 'sinergia',
        'personagem' => 'Qualquer',
        'criterio' => 'Ter 10+ cartas elementais'
    ],
    25 => [
        'id' => 25,
        'nome' => 'MÁQUINA DE RECICLAGEM',
        'descricao' => 'Tenha 8 ou mais cartas do tipo RECICLAGEM/AMARELO no mesmo deck',
        'categoria' => 'sinergia',
        'personagem' => 'Qualquer',
        'criterio' => 'Ter 8+ cartas reciclagem'
    ],
    26 => [
        'id' => 26,
        'nome' => 'GERADOR AMBULANTE',
        'descricao' => 'Na mesma partida consiga 10 ou mais de energia',
        'categoria' => 'outro',
        'personagem' => 'Qualquer',
        'criterio' => 'Acumular 10+ energia'
    ],
    27 => [
        'id' => 27,
        'nome' => 'AMIGÁVEL',
        'descricao' => 'Desbloqueie todos os personagens',
        'categoria' => 'outro',
        'personagem' => 'Qualquer',
        'criterio' => 'Desbloquear todos personagens'
    ]
];

// ============================================================
// 3. ROTEIROS DE REQUISIÇÃO
// ============================================================

$metodo = $_SERVER['REQUEST_METHOD'];

if ($metodo === 'GET') {
    handleGET();
} elseif ($metodo === 'POST') {
    handlePOST();
} else {
    responder('erro', ['mensagem' => 'Método não permitido'], 405);
}

// ============================================================
// 4. HANDLER: GET
// ============================================================
/**
 * GET /php/api/conquistas.php?usuario_id=42
 * 
 * Retorna todas as 27 conquistas com flags de desbloqueio para o usuário
 * 
 * Response:
 * {
 *   "status": "ok",
 *   "conquistas": [
 *     {
 *       "id": 1,
 *       "nome": "CAÇADOR",
 *       "descricao": "Derrote Boss Alfa",
 *       "categoria": "boss",
 *       "personagem": "Qualquer",
 *       "desbloqueada": false,
 *       "data_desbloqueio": null
 *     },
 *     ...
 *   ],
 *   "total": 27,
 *   "desbloqueadas": 3,
 *   "progresso_percentual": 11.11
 * }
 */
function handleGET() {
    global $pdo, $CONQUISTAS;
    
    // Validar usuario_id
    $usuario_id = isset($_GET['usuario_id']) ? intval($_GET['usuario_id']) : null;
    
    if (!$usuario_id || $usuario_id <= 0) {
        responder('erro', ['mensagem' => 'Parâmetro usuario_id inválido'], 400);
    }
    
    // Validar autenticação
    if (empty($_SESSION['user']) || $_SESSION['user']['idUsuario'] != $usuario_id) {
        responder('erro', ['mensagem' => 'Não autorizado'], 401);
    }
    
    try {
        // Query: Obter conquistas desbloqueadas do usuário
        $stmt = $pdo->prepare('
            SELECT 
                uc.idConquista,
                uc.dataDesbloqueio
            FROM usuario_conquistas uc
            WHERE uc.idUsuario = :user_id
        ');
        
        $stmt->execute([':user_id' => $usuario_id]);
        $desbloqueadas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Converter para array associativo para busca rápida
        $desbloqueadas_map = [];
        foreach ($desbloqueadas as $d) {
            $desbloqueadas_map[$d['idConquista']] = $d['dataDesbloqueio'];
        }
        
        // Construir resposta com todas as conquistas
        $conquistas_response = [];
        $total_desbloqueadas = 0;
        
        foreach ($CONQUISTAS as $conquista) {
            $id = $conquista['id'];
            $desbloqueada = isset($desbloqueadas_map[$id]);
            
            if ($desbloqueada) {
                $total_desbloqueadas++;
            }
            
            $conquistas_response[] = [
                'id' => $id,
                'nome' => $conquista['nome'],
                'descricao' => $conquista['descricao'],
                'categoria' => $conquista['categoria'],
                'personagem' => $conquista['personagem'],
                'desbloqueada' => $desbloqueada,
                'data_desbloqueio' => $desbloqueada ? $desbloqueadas_map[$id] : null
            ];
        }
        
        // Calcular progresso
        $total_conquistas = count($CONQUISTAS);
        $progresso_percentual = ($total_conquistas > 0) 
            ? round(($total_desbloqueadas / $total_conquistas) * 100, 2)
            : 0;
        
        responder('ok', [
            'conquistas' => $conquistas_response,
            'total' => $total_conquistas,
            'desbloqueadas' => $total_desbloqueadas,
            'progresso_percentual' => $progresso_percentual
        ], 200);
        
    } catch (PDOException $e) {
        error_log('Erro ao buscar conquistas: ' . $e->getMessage());
        responder('erro', ['mensagem' => 'Erro ao buscar conquistas'], 500);
    }
}

// ============================================================
// 5. HANDLER: POST
// ============================================================
/**
 * POST /php/api/conquistas.php
 * 
 * Registra conquistas desbloqueadas naquela sessão
 * 
 * Request body:
 * {
 *   "usuario_id": 42,
 *   "conquistas_desbloqueadas": [1, 5, 8],
 *   "numero_partida": 123 (opcional)
 * }
 * 
 * Response:
 * {
 *   "status": "ok",
 *   "novas_conquistas": [1, 5, 8],
 *   "conquistas_ja_desbloqueadas": [],
 *   "total_novas": 3,
 *   "total_duplicadas": 0
 * }
 */
function handlePOST() {
    global $pdo, $CONQUISTAS;
    
    // Validar autenticação
    if (empty($_SESSION['user'])) {
        responder('erro', ['mensagem' => 'Não autenticado'], 401);
    }
    
    // Ler JSON
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        responder('erro', ['mensagem' => 'JSON inválido'], 400);
    }
    
    // Validar usuario_id
    $usuario_id = isset($input['usuario_id']) ? intval($input['usuario_id']) : null;
    
    if (!$usuario_id || $usuario_id <= 0) {
        responder('erro', ['mensagem' => 'usuario_id inválido'], 400);
    }
    
    // Validar que o usuário está desbloqueando suas próprias conquistas
    if ($_SESSION['user']['idUsuario'] != $usuario_id) {
        responder('erro', ['mensagem' => 'Tentativa de spoofing detectada'], 403);
    }
    
    // Validar lista de conquistas
    $conquistas_desbloqueadas = isset($input['conquistas_desbloqueadas']) 
        ? $input['conquistas_desbloqueadas']
        : [];
    
    if (!is_array($conquistas_desbloqueadas)) {
        responder('erro', ['mensagem' => 'conquistas_desbloqueadas deve ser um array'], 400);
    }
    
    if (empty($conquistas_desbloqueadas)) {
        responder('ok', [
            'novas_conquistas' => [],
            'conquistas_ja_desbloqueadas' => [],
            'total_novas' => 0,
            'total_duplicadas' => 0
        ], 200);
    }
    
    // Validar IDs das conquistas
    $conquistasValidos = [];
    foreach ($conquistas_desbloqueadas as $id) {
        $id = intval($id);
        if ($id > 0 && isset($CONQUISTAS[$id])) {
            $conquistasValidos[] = $id;
        }
    }
    
    if (empty($conquistasValidos)) {
        responder('erro', ['mensagem' => 'Nenhuma conquista válida fornecida'], 400);
    }
    
    // Número da partida (opcional)
    $numero_partida = isset($input['numero_partida']) 
        ? intval($input['numero_partida'])
        : null;
    
    try {
        // Iniciar transação
        $pdo->beginTransaction();
        
        // 1. Buscar conquistas já desbloqueadas
        $placeholders = implode(',', array_fill(0, count($conquistasValidos), '?'));
        $stmt = $pdo->prepare("
            SELECT idConquista 
            FROM usuario_conquistas 
            WHERE idUsuario = ? AND idConquista IN ($placeholders)
        ");
        
        $params = array_merge([$usuario_id], $conquistasValidos);
        $stmt->execute($params);
        
        $ja_desbloqueadas = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $ja_desbloqueadas[] = intval($row['idConquista']);
        }
        
        // 2. Identificar novas conquistas
        $novas_conquistas = array_diff($conquistasValidos, $ja_desbloqueadas);
        
        // 3. Inserir novas conquistas (evitando duplicatas com IGNORE)
        $stmt = $pdo->prepare("
            INSERT INTO usuario_conquistas 
            (idUsuario, idConquista, dataDesbloqueio)
            VALUES (?, ?, NOW())
        ");
        
        foreach ($novas_conquistas as $id_conquista) {
            $stmt->execute([
                $usuario_id,
                $id_conquista
            ]);
        }
        
        // 4. Atualizar contador em usuarios
        $stmt = $pdo->prepare("
            UPDATE usuarios 
            SET usuarioAtivo = TRUE
            WHERE idUsuario = ?
        ");
        
        $stmt->execute([$usuario_id]);
        
        // Confirmar transação
        $pdo->commit();
        
        // Registrar log
        error_log("Conquistasdesbloqueadas para user $usuario_id: " . implode(',', $novas_conquistas));
        
        responder('ok', [
            'novas_conquistas' => array_values($novas_conquistas),
            'conquistas_ja_desbloqueadas' => $ja_desbloqueadas,
            'total_novas' => count($novas_conquistas),
            'total_duplicadas' => count($ja_desbloqueadas)
        ], 200);
        
    } catch (PDOException $e) {
        $pdo->rollBack();
        error_log('Erro ao registrar conquistas: ' . $e->getMessage());
        responder('erro', ['mensagem' => 'Erro ao registrar conquistas'], 500);
    }
}

?>
