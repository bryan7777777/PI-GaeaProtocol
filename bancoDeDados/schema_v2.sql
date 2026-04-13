-- ============================================================================
-- Gaea Protocol - Database Schema v2.0
-- ============================================================================
-- Versão consolidada do schema do banco de dados
-- - Sem coluna de foto/avatar
-- - Tabelas normalizadas
-- - Índices otimizados
-- - Data: 2026-04-13
-- ============================================================================

-- ============================================================================
-- 1. TABELA: USUÁRIOS
-- ============================================================================
-- Tabela principal de usuários, sem campo de foto
-- ============================================================================

CREATE TABLE IF NOT EXISTS usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    nivel INT DEFAULT 1,
    pontuacao_total INT DEFAULT 0,
    total_partidas INT DEFAULT 0,
    vitorias INT DEFAULT 0,
    derrotas INT DEFAULT 0,
    maior_streak INT DEFAULT 0,
    dinheiro_total_acumulado INT DEFAULT 0,
    lixo_total_reciclado INT DEFAULT 0,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acesso TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT TRUE,
    
    -- Índices para performance
    INDEX idx_email (email),
    INDEX idx_pontuacao (pontuacao_total DESC),
    INDEX idx_data_cadastro (data_cadastro DESC),
    INDEX idx_ultimo_acesso (ultimo_acesso DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 2. TABELA: PARTIDAS
-- ============================================================================
-- Registro de cada partida jogada pelo usuário
-- ============================================================================

CREATE TABLE IF NOT EXISTS partidas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    resultado ENUM('Vitoria', 'Derrota') NOT NULL,
    pontuacao INT NOT NULL,
    duracao_segundos INT NOT NULL,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Campos derivados (calculados a partir de estatisticas_partida)
    cartas_jogadas_nesta INT DEFAULT 0,
    dano_total_neste INT DEFAULT 0,
    cura_total_neste INT DEFAULT 0,
    
    -- Índices
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_usuario (usuario_id),
    INDEX idx_resultado (resultado),
    INDEX idx_data_hora (data_hora DESC),
    INDEX idx_pontuacao (pontuacao DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 3. TABELA: ESTATÍSTICAS DETALHADAS DA PARTIDA
-- ============================================================================
-- Dados granulares e detalhados de cada partida
-- ============================================================================

CREATE TABLE IF NOT EXISTS estatisticas_partida (
    id INT PRIMARY KEY AUTO_INCREMENT,
    partida_id INT NOT NULL,
    cartas_jogadas INT NOT NULL,
    dinheiro_acumulado INT NOT NULL,
    dinheiro_gasto INT NOT NULL,
    lixo_reciclado INT NOT NULL,
    dano_total INT NOT NULL,
    cura_total INT NOT NULL,
    rodadas_sobrevividas INT NOT NULL,
    
    -- Campos adicionais de contexto
    mapa_id INT DEFAULT NULL,
    dificuldade ENUM('Normal', 'Desafiador', 'Impossível') DEFAULT 'Normal',
    personagem_selecionado VARCHAR(50) DEFAULT NULL,
    boss_derrotado VARCHAR(100) DEFAULT NULL,
    
    -- Timestamp de quando foi registrada
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Relação com partida
    FOREIGN KEY (partida_id) REFERENCES partidas(id) ON DELETE CASCADE,
    INDEX idx_partida (partida_id),
    INDEX idx_lixo (lixo_reciclado DESC),
    INDEX idx_dano (dano_total DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 4. TABELA: CONQUISTAS (ACHIEVEMENTS MASTER)
-- ============================================================================
-- Definição das 27 conquistas do jogo (dados estáticos)
-- ============================================================================

CREATE TABLE IF NOT EXISTS conquistas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    personagem VARCHAR(50) NOT NULL,
    categoria ENUM(
        'boss',           -- Derrotar bosses
        'reciclagem',     -- Reciclar itens
        'vida',           -- Acumular vida
        'escudo',         -- Acumular escudo
        'sinergia'        -- Combos de cartas
    ) NOT NULL,
    icone VARCHAR(10) DEFAULT '🏆',
    pontos_bonus INT DEFAULT 100,
    descricao_desafio TEXT,
    
    -- Índices
    INDEX idx_categoria (categoria),
    INDEX idx_nome (nome)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 5. TABELA: CONQUISTAS DO USUÁRIO (PROGRESSO)
-- ============================================================================
-- Rastreamento de quais conquistas cada usuário desbloqueou
-- ============================================================================

CREATE TABLE IF NOT EXISTS usuario_conquistas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    conquista_id INT NOT NULL,
    data_desbloqueio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    partida_id INT DEFAULT NULL,
    
    -- Constraint: um usuário não pode desbloquear a mesma conquista duas vezes
    UNIQUE KEY unique_usuario_conquista (usuario_id, conquista_id),
    
    -- Índices
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (conquista_id) REFERENCES conquistas(id) ON DELETE CASCADE,
    FOREIGN KEY (partida_id) REFERENCES partidas(id) ON DELETE SET NULL,
    INDEX idx_usuario (usuario_id),
    INDEX idx_conquista (conquista_id),
    INDEX idx_data_desbloqueio (data_desbloqueio DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 6. VIEW: RANKING
-- ============================================================================
-- View calculada do ranking de usuários baseado em pontuação
-- ============================================================================

CREATE OR REPLACE VIEW ranking AS
SELECT 
    ROW_NUMBER() OVER (ORDER BY u.pontuacao_total DESC) as posicao,
    u.id as usuario_id,
    u.nome,
    u.pontuacao_total,
    CASE 
        WHEN u.total_partidas = 0 THEN 0
        ELSE ROUND((u.vitorias * 100.0) / u.total_partidas, 2)
    END as win_rate,
    u.nivel,
    u.total_partidas,
    u.vitorias,
    u.derrotas,
    u.maior_streak,
    u.data_cadastro,
    u.ultimo_acesso
FROM usuarios u
WHERE u.ativo = TRUE
ORDER BY u.pontuacao_total DESC;

-- ============================================================================
-- 7. VIEW: PROGRESSO DO USUÁRIO
-- ============================================================================
-- View consolidada do progresso de conquistas por usuário
-- ============================================================================

CREATE OR REPLACE VIEW usuario_progresso_conquistas AS
SELECT 
    u.id as usuario_id,
    u.nome,
    COUNT(DISTINCT uc.conquista_id) as conquistas_desbloqueadas,
    27 as total_conquistas,
    ROUND((COUNT(DISTINCT uc.conquista_id) * 100.0) / 27, 2) as percentual_progresso,
    GROUP_CONCAT(c.categoria SEPARATOR ',') as categorias_desbloqueadas
FROM usuarios u
LEFT JOIN usuario_conquistas uc ON u.id = uc.usuario_id
LEFT JOIN conquistas c ON uc.conquista_id = c.id
WHERE u.ativo = TRUE
GROUP BY u.id, u.nome;

-- ============================================================================
-- 8. TABELAS AUXILIARES (Para compatibilidade com código legado)
-- ============================================================================

-- senha_reset: Para recuperação de senha
CREATE TABLE IF NOT EXISTS senha_reset (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_expiracao TIMESTAMP,
    usado BOOLEAN DEFAULT FALSE,
    
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_token (token),
    INDEX idx_usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- log_sessao: Para auditoria de acessos
CREATE TABLE IF NOT EXISTS log_sessao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    tipo_evento ENUM('login', 'logout', 'erro') NOT NULL,
    data_evento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_endereco VARCHAR(45),
    user_agent TEXT,
    
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_usuario (usuario_id),
    INDEX idx_data_evento (data_evento DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 9. DADOS INICIAIS: 27 CONQUISTAS
-- ============================================================================
-- Inserção das 27 conquistas extraídas de conquista.txt
-- ============================================================================

INSERT IGNORE INTO conquistas (nome, descricao, personagem, categoria, icone, pontos_bonus) VALUES
-- BOSSES (13)
('CAÇADOR', 'Derrote Boss Alfa', 'Qualquer', 'boss', '🗡️', 150),
('LUTADOR', 'Derrote Boss Beta', 'Qualquer', 'boss', '💪', 150),
('ESTRATEGISTA', 'Derrote Boss Gama', 'Qualquer', 'boss', '🧠', 150),
('DESTRUIDOR', 'Derrote Boss Delta', 'Qualquer', 'boss', '💥', 150),
('GUARDIÃO', 'Derrote Boss Epsilon', 'Qualquer', 'boss', '🛡️', 150),
('MESTRE DO TEMPO', 'Derrote Boss Zeta', 'Qualquer', 'boss', '⏱️', 150),
('VENCEDOR DE MONSTROS', 'Derrote 10 inimigos diferentes', 'Qualquer', 'boss', '👹', 150),
('NECRÓFAGO', 'Derrote Nêmora', 'Qualquer', 'boss', '💀', 200),
('REI DA GLÓRIA', 'Vença 5 partidas seguidas', 'Qualquer', 'boss', '👑', 250),
('SOBREVIVENTE', 'Sobreviva 50 rodadas', 'Qualquer', 'boss', '🧟', 150),
('DESTRUIÇÃO PURA', 'Causa 5000 de dano em uma partida', 'Qualquer', 'boss', '⚡', 150),
('CURA ETERNA', 'Cure 2000 de vida em uma partida', 'Qualquer', 'boss', '💚', 150),
('INCOMPARÁVEL', 'Vença 50 partidas', 'Qualquer', 'boss', '🏆', 200),

-- RECICLAGEM (5)
('ECOLOGISTA', 'Recicle 50 itens de lixo', 'Qualquer', 'reciclagem', '♻️', 100),
('ALIADO DO PLANETA', 'Recicle 200 itens de lixo', 'Qualquer', 'reciclagem', '🌍', 150),
('PURIFICADOR', 'Recicle 500 itens de lixo', 'Qualquer', 'reciclagem', '✨', 200),
('MESTRE DA RECICLAGEM', 'Recicle 1000 itens de lixo', 'Qualquer', 'reciclagem', '🔄', 300),
('REDENTOR', 'Recicle 2000 itens de lixo', 'Qualquer', 'reciclagem', '⭐', 400),

-- VIDA (3)
('RESISTÊNCIA', 'Termina uma partida com 500+ de vida', 'Qualquer', 'vida', '❤️', 100),
('FORTALEZA', 'Termina uma partida com 1000+ de vida', 'Qualquer', 'vida', '🏰', 150),
('INDESTRUTÍVEL', 'Termina uma partida com 2000+ de vida', 'Qualquer', 'vida', '💎', 200),

-- ESCUDO (2)
('ESCUDO VALENTE', 'Acumule 500 de escudo', 'Qualquer', 'escudo', '⚔️', 100),
('PROTETOR', 'Acumule 1500 de escudo', 'Qualquer', 'escudo', '🛡️', 150),

-- SINERGIA (4)
('RIQUEZA', 'Acumule 10000 de dinheiro em uma partida', 'Qualquer', 'sinergia', '💰', 150),
('CONHECIMENTO', 'Desbloqueie todas as cartas de uma categoria', 'Qualquer', 'sinergia', '📚', 200),
('PODER', 'Combine 5 cartas de poder', 'Qualquer', 'sinergia', '⚡', 150),
('DOMINAÇÃO', 'Domine o campo de batalha (combinações perfeitas)', 'Qualquer', 'sinergia', '👑', 250);

-- ============================================================================
-- 10. MIGRAÇÃO: Alterações em tabelas existentes
-- ============================================================================
-- Se tabelas já existem no banco antigo, aplicar alterações necessárias
-- ============================================================================

-- Verificar se coluna 'nivel' existe em usuarios, senão adicionar
ALTER TABLE usuarios 
ADD COLUMN IF NOT EXISTS nivel INT DEFAULT 1
AFTER senha_hash;

-- Verificar se coluna 'maior_streak' existe
ALTER TABLE usuarios 
ADD COLUMN IF NOT EXISTS maior_streak INT DEFAULT 0
AFTER derrotas;

-- Verificar se coluna 'lixo_total_reciclado' existe
ALTER TABLE usuarios 
ADD COLUMN IF NOT EXISTS lixo_total_reciclado INT DEFAULT 0
AFTER dinheiro_total_acumulado;

-- Remover coluna 'foto' ou 'fotoPerfilBlob' se existir (LIMPEZA)
ALTER TABLE usuarios 
DROP COLUMN IF EXISTS foto;

ALTER TABLE usuarios 
DROP COLUMN IF EXISTS fotoPerfilBlob;

ALTER TABLE usuarios 
DROP COLUMN IF EXISTS fotoPerfil;

-- ============================================================================
-- 11. ÍNDICES PRINCIPAIS PARA OTIMIZAÇÃO
-- ============================================================================

-- Índices em partidas para queries frequentes
ALTER TABLE partidas 
ADD INDEX idx_usuario_data (usuario_id, data_hora DESC);

ALTER TABLE partidas 
ADD INDEX idx_resultado_usuario (resultado, usuario_id);

-- Índices em estatisticas
ALTER TABLE estatisticas_partida 
ADD INDEX idx_cartas_jogadas (cartas_jogadas DESC);

-- Índices em usuario_conquistas
ALTER TABLE usuario_conquistas 
ADD INDEX idx_data_descending (data_desbloqueio DESC);

-- ============================================================================
-- 12. CRIAR FUNÇÃO PARA CALCULAR NÍVEL
-- ============================================================================
-- Nível é calculado como: floor(total_partidas / 5) + 1

DELIMITER //

CREATE FUNCTION IF NOT EXISTS calcular_nivel(total_partidas INT)
RETURNS INT
DETERMINISTIC
BEGIN
    RETURN FLOOR(total_partidas / 5) + 1;
END //

DELIMITER ;

-- ============================================================================
-- 13. TRIGGER PARA ATUALIZAR NÍVEL AUTOMATICAMENTE
-- ============================================================================
-- Quando total_partidas é atualizado, recalcular o nível

DELIMITER //

CREATE TRIGGER IF NOT EXISTS atualizar_nivel_usuario
BEFORE UPDATE ON usuarios
FOR EACH ROW
BEGIN
    SET NEW.nivel = FLOOR(NEW.total_partidas / 5) + 1;
END //

DELIMITER ;

-- ============================================================================
-- 14. STORED PROCEDURE: Registrar Partida
-- ============================================================================
-- Procedure para registrar nova partida e atualizar usuário

DELIMITER //

CREATE PROCEDURE IF NOT EXISTS sp_registrar_partida(
    IN p_usuario_id INT,
    IN p_resultado VARCHAR(10),
    IN p_pontuacao INT,
    IN p_duracao_segundos INT,
    IN p_cartas_jogadas INT,
    IN p_dinheiro_acumulado INT,
    IN p_dinheiro_gasto INT,
    IN p_lixo_reciclado INT,
    IN p_dano_total INT,
    IN p_cura_total INT,
    IN p_rodadas_sobrevividas INT,
    OUT p_partida_id INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_partida_id = -1;
    END;
    
    START TRANSACTION;
    
    -- 1. Inserir partida
    INSERT INTO partidas (usuario_id, resultado, pontuacao, duracao_segundos)
    VALUES (p_usuario_id, p_resultado, p_pontuacao, p_duracao_segundos);
    
    SET p_partida_id = LAST_INSERT_ID();
    
    -- 2. Inserir estatísticas
    INSERT INTO estatisticas_partida (
        partida_id, cartas_jogadas, dinheiro_acumulado, dinheiro_gasto,
        lixo_reciclado, dano_total, cura_total, rodadas_sobrevividas
    ) VALUES (
        p_partida_id, p_cartas_jogadas, p_dinheiro_acumulado, p_dinheiro_gasto,
        p_lixo_reciclado, p_dano_total, p_cura_total, p_rodadas_sobrevividas
    );
    
    -- 3. Atualizar usuário
    UPDATE usuarios
    SET 
        total_partidas = total_partidas + 1,
        pontuacao_total = pontuacao_total + p_pontuacao,
        vitorias = vitorias + (CASE WHEN p_resultado = 'Vitoria' THEN 1 ELSE 0 END),
        derrotas = derrotas + (CASE WHEN p_resultado = 'Derrota' THEN 1 ELSE 0 END),
        dinheiro_total_acumulado = dinheiro_total_acumulado + p_dinheiro_acumulado,
        lixo_total_reciclado = lixo_total_reciclado + p_lixo_reciclado
    WHERE id = p_usuario_id;
    
    COMMIT;
END //

DELIMITER ;

-- ============================================================================
-- 15. STORED PROCEDURE: Desbloquear Conquista
-- ============================================================================
-- Procedure para desbloquear conquista sem duplicar

DELIMITER //

CREATE PROCEDURE IF NOT EXISTS sp_desbloquear_conquista(
    IN p_usuario_id INT,
    IN p_conquista_id INT,
    IN p_partida_id INT,
    OUT p_desbloqueada BOOLEAN
)
BEGIN
    DECLARE v_count INT;
    
    INSERT IGNORE INTO usuario_conquistas (usuario_id, conquista_id, partida_id)
    VALUES (p_usuario_id, p_conquista_id, p_partida_id);
    
    IF ROW_COUNT() > 0 THEN
        SET p_desbloqueada = TRUE;
    ELSE
        SET p_desbloqueada = FALSE;
    END IF;
END //

DELIMITER ;

-- ============================================================================
-- FIM DO SCHEMA v2.0
-- ============================================================================
-- Data: 2026-04-13
-- Status: Pronto para produção
-- Mudanças: Consolidação de schema, remoção de coluna foto, normalização
-- ============================================================================
