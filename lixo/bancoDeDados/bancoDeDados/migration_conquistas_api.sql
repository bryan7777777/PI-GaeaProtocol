-- ============================================================
-- MIGRAÇÃO: Sistema de Conquistas (Achievements)
-- Arquivo: migration_conquistas_api.sql
-- Data: 2026-04-13
-- ============================================================

-- ============================================================
-- 1. TABELA PRINCIPAL: conquistas (definição estática)
-- ============================================================
-- Esta tabela armazena a definição das conquistas do jogo
-- Alternativamente, pode estar em memoria no PHP

CREATE TABLE IF NOT EXISTS `conquistas` (
    `idConquista` INT AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(100) NOT NULL UNIQUE,
    `descricao` TEXT NOT NULL,
    `categoria` ENUM(
        'boss', 
        'escudo', 
        'vida', 
        'reciclagem', 
        'sinergia', 
        'outro'
    ) NOT NULL,
    `personagem` VARCHAR(50),
    `criterio` TEXT NOT NULL,
    `valor_requerido` INT DEFAULT 0,
    `data_criacao` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX `idx_categoria` (`categoria`),
    INDEX `idx_personagem` (`personagem`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 2. TABELA DE DESBLOQUEIO: conquistas_desbloqueadas
-- ============================================================
-- Armazena relacionamento usuario <-> conquista desbloqueada
CREATE TABLE IF NOT EXISTS `conquistas_desbloqueadas` (
    `idDesbloqueio` INT AUTO_INCREMENT PRIMARY KEY,
    `idUser` INT NOT NULL,
    `idConquista` INT NOT NULL,
    `dataDesbloqueio` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `numeroPartida` INT DEFAULT NULL,
    
    -- Verificações
    FOREIGN KEY (`idUser`) REFERENCES `user`(`idUser`) ON DELETE CASCADE,
    FOREIGN KEY (`idConquista`) REFERENCES `conquistas`(`idConquista`) ON DELETE CASCADE,
    
    -- Evitar duplicatas
    UNIQUE KEY `uk_user_conquista` (`idUser`, `idConquista`),
    
    -- Índices para queries frequentes
    INDEX `idx_user` (`idUser`),
    INDEX `idx_conquista` (`idConquista`),
    INDEX `idx_data` (`dataDesbloqueio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 3. POPULATING: Inserir 27 Conquistas
-- ============================================================

INSERT INTO `conquistas` (
    `idConquista`, 
    `nome`, 
    `descricao`, 
    `categoria`, 
    `personagem`, 
    `criterio`, 
    `valor_requerido`
) VALUES
-- BOSSES (1-13)
(1, 'CAÇADOR', 'Derrote Boss Alfa', 'boss', 'Qualquer', 'Derrotar boss_alfa', 1),
(2, 'PESCANDO', 'Derrote Boss Kraken', 'boss', 'Qualquer', 'Derrotar boss_kraken', 1),
(3, 'HEREGE', 'Derrote Boss Paládio', 'boss', 'Qualquer', 'Derrotar boss_paladdum', 1),
(4, 'OBSOLETO', 'Derrote Boss Valk', 'boss', 'Qualquer', 'Derrotar boss_valk', 1),
(5, 'UM SEGREDO', 'Derrote Boss Solice', 'boss', 'Qualquer', 'Derrotar boss_solice', 1),
(6, 'REI MAGO', 'Derrote Boss Ayla', 'boss', 'Qualquer', 'Derrotar boss_ayla', 1),
(7, 'SALVADOR ECO', 'Derrote Boss IA', 'boss', 'Qualquer', 'Derrotar boss_ia', 1),
(8, 'LIMPANDO A POEIRA', 'Derrote Boss Nêmora', 'boss', 'Qualquer', 'Derrotar boss_nemora', 1),
(9, 'HORA DO TRUCO', 'Derrote Boss Svetlana', 'boss', 'Qualquer', 'Derrotar boss_svetlana', 1),
(10, 'CORROMPIDO', 'Derrote Boss Pedro', 'boss', 'Qualquer', 'Derrotar boss_pedro', 1),
(11, 'CHESS', 'Derrote Boss Belinda', 'boss', 'Qualquer', 'Derrotar boss_belinda', 1),
(12, 'DESCANSO HEROICO', 'Derrote Boss Guinevere', 'boss', 'Qualquer', 'Derrotar boss_guinevere', 1),
(13, 'TRATANDO O MAR', 'Derrote Boss Isla', 'boss', 'Qualquer', 'Derrotar boss_isla', 1),

-- ESCUDO (14-15)
(14, 'REFORÇADO', 'Na mesma partida consiga 200 de escudo', 'escudo', 'Qualquer', 'Acumular 200 escudo', 200),
(15, 'BRILHANTE', 'Na mesma partida consiga 400 de escudo', 'escudo', 'Qualquer', 'Acumular 400 escudo', 400),

-- VIDA/HP (16-18)
(16, 'VITALÍCIO', 'Na mesma partida consiga ter mais de 300 de vida', 'vida', 'Qualquer', 'Ter 300+ HP', 300),
(17, 'GIGANTE', 'Na mesma partida consiga ter mais de 400 de vida', 'vida', 'Qualquer', 'Ter 400+ HP', 400),
(18, 'IMORTAL', 'Na mesma partida consiga ter mais de 500 de vida', 'vida', 'Qualquer', 'Ter 500+ HP', 500),

-- RECICLAGEM/LIXO (19-23)
(19, 'O COMEÇO', 'Na mesma partida consiga reciclar um total de 150 lixos', 'reciclagem', 'Gaea', 'Reciclar 150 lixo', 150),
(20, 'LIMPANDO O MUNDO', 'Na mesma partida consiga reciclar um total de 250 lixos', 'reciclagem', 'Gaea', 'Reciclar 250 lixo', 250),
(21, 'TRATAMENTO DA TERRA', 'Na mesma partida consiga reciclar um total de 350 lixos', 'reciclagem', 'Gaea', 'Reciclar 350 lixo', 350),
(22, 'GRANDE ATITUDE', 'Na mesma partida consiga reciclar um total de 450 lixos', 'reciclagem', 'Gaea', 'Reciclar 450 lixo', 450),
(23, 'RECICLANDO O FUTURO', 'Na mesma partida consiga reciclar um total de 600 lixos', 'reciclagem', 'Gaea', 'Reciclar 600 lixo', 600),

-- SINERGIA E OUTROS (24-27)
(24, 'SINERGIA ELEMENTAL', 'Tenha 10 ou mais cartas de qualquer tipo ELEMENTAL no mesmo deck', 'sinergia', 'Qualquer', 'Ter 10+ cartas elementais', 10),
(25, 'MÁQUINA DE RECICLAGEM', 'Tenha 8 ou mais cartas do tipo RECICLAGEM/AMARELO no mesmo deck', 'sinergia', 'Qualquer', 'Ter 8+ cartas reciclagem', 8),
(26, 'GERADOR AMBULANTE', 'Na mesma partida consiga 10 ou mais de energia', 'outro', 'Qualquer', 'Acumular 10+ energia', 10),
(27, 'AMIGÁVEL', 'Desbloqueie todos os personagens', 'outro', 'Qualquer', 'Desbloquear todos personagens', 1)
ON DUPLICATE KEY UPDATE `idConquista`=`idConquista`;

-- ============================================================
-- 4. ESTATÍSTICAS (opcional)
-- ============================================================
-- Adicionar coluna de contagem de conquistas desbloqueadas à tabela userStatus
ALTER TABLE `userStatus` 
ADD COLUMN IF NOT EXISTS `conquistas_desbloqueadas` INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS `data_ultima_conquista` TIMESTAMP NULL;

-- ============================================================
-- 5. ÍNDICES ADICIONAIS PARA PERFORMANCE
-- ============================================================
ALTER TABLE `conquistas_desbloqueadas`
ADD INDEX IF NOT EXISTS `idx_user_data` (`idUser`, `dataDesbloqueio`);

-- ============================================================
-- 6. VIEW: Conquistas por Usuário
-- ============================================================
CREATE OR REPLACE VIEW `vw_conquistas_usuario` AS
SELECT 
    u.idUser,
    c.idConquista,
    c.nome,
    c.descricao,
    c.categoria,
    c.personagem,
    c.criterio,
    CASE 
        WHEN cd.idDesbloqueio IS NOT NULL THEN 1 
        ELSE 0 
    END AS desbloqueada,
    cd.dataDesbloqueio
FROM `user` u
CROSS JOIN `conquistas` c
LEFT JOIN `conquistas_desbloqueadas` cd 
    ON u.idUser = cd.idUser 
    AND c.idConquista = cd.idConquista
ORDER BY c.idConquista;

-- ============================================================
-- SUMMARY
-- ============================================================
-- Tabelas criadas:
--   - conquistas (27 linhas inseridas)
--   - conquistas_desbloqueadas (relacionamentos)
-- Colunas adicionadas à userStatus:
--   - conquistas_desbloqueadas (count)
--   - data_ultima_conquista
-- View criada:
--   - vw_conquistas_usuario
