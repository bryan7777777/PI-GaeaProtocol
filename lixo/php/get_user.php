<?php
/**
 * ============================================================
 * API REST - VERIFICAÇÃO DE AUTENTICAÇÃO
 * ============================================================
 * 
 * Arquivo: /php/get_user.php
 * Descrição: Endpoint que retorna dados do usuário autenticado
 *            ou status de visitante
 * 
 * Método: GET
 * Autenticação: Não obrigatória (retorna dados públicos se visitante)
 * 
 * Autor: GitHub Copilot
 * Data: 2026-04-13
 * Versão: 1.0.0
 * 
 * ============================================================
 */

// Incluir configuração, BD e helpers de resposta
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/config/db.php';
require_once __DIR__ . '/config/response.php';

// ============================================================
// 1. Validar método HTTP (apenas GET)
// ============================================================
validar_metodo_get();

// ============================================================
// 2. Iniciar sessão segura
// ============================================================
start_secure_session();

// ============================================================
// 3. Verificar autenticação e retornar dados
// ============================================================

if (empty($_SESSION['user'])) {
    // Visitante (não autenticado)
    responder_ok(
        [
            'authenticated' => false,
            'user' => null
        ],
        'Visitante (não autenticado)',
        HTTP_OK
    );
}

// Usuário autenticado - retornar dados
responder_ok(
    [
        'authenticated' => true,
        'user' => [
            'id' => $_SESSION['user']['id'],
            'nome' => $_SESSION['user']['nome'] ?? 'Usuário',
            'nomeUsuario' => $_SESSION['user']['nome'] ?? null,
            'email' => $_SESSION['user']['email'] ?? null,
            'avatar' => $_SESSION['user']['fotoPerfil'] ?? null,
            'nivelAcesso' => $_SESSION['user']['nivelAcesso'] ?? 'usuario'
        ]
    ],
    'Usuário autenticado',
    HTTP_OK
);

// ============================================================
// FIM DO ARQUIVO
// ============================================================
?>