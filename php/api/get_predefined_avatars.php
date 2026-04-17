<?php
/**
 * API - Avatares Predefinidos Disponíveis
 * GET /php/api/get_predefined_avatars.php
 * 
 * Retorna lista de avatares predefinidos que o usuário pode escolher
 */

require_once '../config.php';

header('Content-Type: application/json');

// Lista de avatares predefinidos disponíveis
// Cada avatar tem um ID, ícone Font Awesome e cor
$avataresPredefinidos = [
    [
        'id' => 'avatar_1',
        'nome' => 'Guerreiro',
        'icone' => 'fa-shield',
        'cor' => '#ff6b6b',
        'descricao' => 'Forte e corajoso'
    ],
    [
        'id' => 'avatar_2',
        'nome' => 'Mago',
        'icone' => 'fa-wand-magic-sparkles',
        'cor' => '#7c3aed',
        'descricao' => 'Poder mágico'
    ],
    [
        'id' => 'avatar_3',
        'nome' => 'Arqueera',
        'icone' => 'fa-bow',
        'cor' => '#f59e0b',
        'descricao' => 'Rápida e precisa'
    ],
    [
        'id' => 'avatar_4',
        'nome' => 'Paladino',
        'icone' => 'fa-heart',
        'cor' => '#ec4899',
        'descricao' => 'Protetor honrado'
    ],
    [
        'id' => 'avatar_5',
        'nome' => 'Ladrão',
        'icone' => 'fa-mask',
        'cor' => '#06b6d4',
        'descricao' => 'Sorrateiro e ágil'
    ],
    [
        'id' => 'avatar_6',
        'nome' => 'Druida',
        'icone' => 'fa-leaf',
        'cor' => '#10b981',
        'descricao' => 'Conectado com a natureza'
    ],
    [
        'id' => 'avatar_7',
        'nome' => 'Necromante',
        'icone' => 'fa-skull',
        'cor' => '#64748b',
        'descricao' => 'Mestre do além'
    ],
    [
        'id' => 'avatar_8',
        'nome' => 'Bardo',
        'icone' => 'fa-music',
        'cor' => '#8b5cf6',
        'descricao' => 'Inspirador de corações'
    ],
    [
        'id' => 'avatar_9',
        'nome' => 'Capanga',
        'icone' => 'fa-fire',
        'cor' => '#ef4444',
        'descricao' => 'Poderosa força'
    ],
    [
        'id' => 'avatar_10',
        'nome' => 'Explorador',
        'icone' => 'fa-compass',
        'cor' => '#3b82f6',
        'descricao' => 'Aventureiro destemido'
    ],
    [
        'id' => 'avatar_11',
        'nome' => 'Engenheiro',
        'icone' => 'fa-wrench',
        'cor' => '#f97316',
        'descricao' => 'Criador de engenhocas'
    ],
    [
        'id' => 'avatar_12',
        'nome' => 'Sacerdote',
        'icone' => 'fa-cross',
        'cor' => '#fbbf24',
        'descricao' => 'Curador benção divina'
    ]
];

echo json_encode([
    'success' => true,
    'avatares' => $avataresPredefinidos,
    'total' => count($avataresPredefinidos)
]);
?>
