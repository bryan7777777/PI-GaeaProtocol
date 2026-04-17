-- ============================================================================
-- Gaea Protocol - Database Schema v2.1 (CORRIGIDO)
-- ============================================================================
-- Versão corrigida do schema do banco de dados
-- - Nomes de colunas descritivos (sem genéricos)
-- - Erro em data_expiração corrigido (DATETIME NULL)
-- - Tabelas renomeadas para clareza
-- - Data: 2026-04-13
-- ============================================================================

-- ============================================================================
-- 1. TABELA: USUÁRIOS
-- ============================================================================
-- Tabela principal de usuários com roles (jogador/admin)
-- ============================================================================

CREATE TABLE IF NOT EXISTS usuarios (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nomeUsuario VARCHAR(100) NOT NULL,
    emailUsuario VARCHAR(150) NOT NULL UNIQUE,
    senhaHash VARCHAR(255) NOT NULL,
    tipoUsuario ENUM('jogador', 'admin') NOT NULL DEFAULT 'jogador',
    nivelJogador INT DEFAULT 1,
    pontuacaoTotal INT DEFAULT 0,
    totalPartidas INT DEFAULT 0,
    totalVitorias INT DEFAULT 0,
    totalDerrotas INT DEFAULT 0,
    maiorStreak INT DEFAULT 0,
    dinheiroTotalAcumulado INT DEFAULT 0,
    lixoTotalReciclado INT DEFAULT 0,
    dataCadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimoAcesso TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    usuarioAtivo BOOLEAN DEFAULT TRUE,
    
    -- Índices para performance
    INDEX idx_emailUsuario (emailUsuario),
    INDEX idx_pontuacaoTotal (pontuacaoTotal DESC),
    INDEX idx_dataCadastro (dataCadastro DESC),
    INDEX idx_ultimoAcesso (ultimoAcesso DESC),
    INDEX idx_tipoUsuario (tipoUsuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 2. TABELA: PARTIDAS
-- ============================================================================
-- Registro de cada partida jogada pelo usuário
-- ============================================================================

CREATE TABLE IF NOT EXISTS partidas (
    idPartida INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    resultadoPartida ENUM('Vitoria', 'Derrota') NOT NULL,
    pontuacaoPartida INT NOT NULL,
    duracaoSegundos INT NOT NULL,
    dataHoraPartida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Campos derivados (calculados a partir de estatisticas_partida)
    cartasJogadasPartida INT DEFAULT 0,
    danoTotalPartida INT DEFAULT 0,
    curaTotalPartida INT DEFAULT 0,
    
    -- Índices
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE,
    INDEX idx_idUsuario (idUsuario),
    INDEX idx_resultadoPartida (resultadoPartida),
    INDEX idx_dataHoraPartida (dataHoraPartida DESC),
    INDEX idx_pontuacaoPartida (pontuacaoPartida DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 3. TABELA: ESTATÍSTICAS DETALHADAS DA PARTIDA
-- ============================================================================
-- Dados granulares e detalhados de cada partida
-- ============================================================================

CREATE TABLE IF NOT EXISTS estatisticas_partida (
    idEstatisticaPartida INT PRIMARY KEY AUTO_INCREMENT,
    idPartida INT NOT NULL,
    cartasJogadas INT NOT NULL,
    dinheiroAcumulado INT NOT NULL,
    dinheiroGasto INT NOT NULL,
    lixoReciclado INT NOT NULL,
    danoTotal INT NOT NULL,
    curaTotal INT NOT NULL,
    rodadasSobrevividas INT NOT NULL,
    
    -- Campos adicionais de contexto
    idMapa INT DEFAULT NULL,
    nivelDificuldade ENUM('Normal', 'Desafiador', 'Impossível') DEFAULT 'Normal',
    nomPersonagemSelecionado VARCHAR(50) DEFAULT NULL,
    nomBossDerrrotado VARCHAR(100) DEFAULT NULL,
    
    -- Timestamp de quando foi registrada
    dataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Relação com partida
    FOREIGN KEY (idPartida) REFERENCES partidas(idPartida) ON DELETE CASCADE,
    INDEX idx_idPartida (idPartida),
    INDEX idx_lixoReciclado (lixoReciclado DESC),
    INDEX idx_danoTotal (danoTotal DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 4. TABELA: CONQUISTAS (ACHIEVEMENTS MASTER)
-- ============================================================================
-- Definição das 27 conquistas do jogo (dados estáticos)
-- ============================================================================

CREATE TABLE IF NOT EXISTS conquistas (
    idConquista INT PRIMARY KEY AUTO_INCREMENT,
    nomeConquista VARCHAR(100) NOT NULL,
    descricaoConquista TEXT NOT NULL,
    nomPersonagemConquista VARCHAR(50) NOT NULL,
    categoriaConquista ENUM(
        'boss',           -- Derrotar bosses
        'reciclagem',     -- Reciclar itens
        'vida',           -- Acumular vida
        'escudo',         -- Acumular escudo
        'sinergia'        -- Combos de cartas
    ) NOT NULL,
    iconeConquista VARCHAR(10) DEFAULT '🏆',
    pontosBonusConquista INT DEFAULT 100,
    descricaoDesafioConquista TEXT,
    
    -- Índices
    INDEX idx_categoriaConquista (categoriaConquista),
    INDEX idx_nomeConquista (nomeConquista)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 5. TABELA: CONQUISTAS DO USUÁRIO (PROGRESSO)
-- ============================================================================
-- Rastreamento de quais conquistas cada usuário desbloqueou
-- ============================================================================

CREATE TABLE IF NOT EXISTS usuario_conquistas (
    idUsuarioConquista INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    idConquista INT NOT NULL,
    dataDesbloqueioConquista TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    idPartidaDesbloqueio INT DEFAULT NULL,
    
    -- Constraint: um usuário não pode desbloquear a mesma conquista duas vezes
    UNIQUE KEY uq_idUsuario_idConquista (idUsuario, idConquista),
    
    -- Índices
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE,
    FOREIGN KEY (idConquista) REFERENCES conquistas(idConquista) ON DELETE CASCADE,
    FOREIGN KEY (idPartidaDesbloqueio) REFERENCES partidas(idPartida) ON DELETE SET NULL,
    INDEX idx_idUsuario (idUsuario),
    INDEX idx_idConquista (idConquista),
    INDEX idx_dataDesbloqueioConquista (dataDesbloqueioConquista DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 6. TABELA AUXILIAR: REDEFINIÇÃO DE SENHA (Password Reset)
-- ============================================================================
-- Armazena tokens temporários para recuperação de senha com expiração
-- ⚠️ CORRIGIDO: data_expiração era TIMESTAMP, agora é DATETIME NULL
-- ============================================================================

CREATE TABLE IF NOT EXISTS redefinicao_senha (
    idRedefinicao INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    tokenSeguranca VARCHAR(255) NOT NULL UNIQUE,
    dataCriacaoToken TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dataExpiracaoToken DATETIME NULL DEFAULT NULL,
    foiUtilizado BOOLEAN DEFAULT FALSE,
    
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE,
    INDEX idx_tokenSeguranca (tokenSeguranca),
    INDEX idx_idUsuario (idUsuario),
    INDEX idx_dataExpiracaoToken (dataExpiracaoToken)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 7. TABELA AUXILIAR: LOG DE AUTENTICAÇÃO
-- ============================================================================
-- Auditoria de acessos, logins, logouts e erros de autenticação
-- ============================================================================

CREATE TABLE IF NOT EXISTS log_autenticacao (
    idLogAutenticacao INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    tipoEvento ENUM('login', 'logout', 'erro_senha', 'erro_email', 'sessao_expirada') NOT NULL,
    dataHoraEvento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    enderecoIPCliente VARCHAR(45),
    userAgent TEXT,
    mensagemEvento VARCHAR(255),
    
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE,
    INDEX idx_idUsuario (idUsuario),
    INDEX idx_dataHoraEvento (dataHoraEvento DESC),
    INDEX idx_tipoEvento (tipoEvento)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 8. TABELA AUXILIAR: LOG DE API (Para Tarefa 6)
-- ============================================================================
-- Armazena todos os erros e requisições da API
-- ============================================================================

CREATE TABLE IF NOT EXISTS api_logs (
    idLogAPI INT PRIMARY KEY AUTO_INCREMENT,
    nomeEndpointAPI VARCHAR(100) NOT NULL,
    metodoHTTP VARCHAR(10) NOT NULL,
    idUsuarioRequisicao INT DEFAULT NULL,
    statusRequisiacao ENUM('ok', 'erro') NOT NULL,
    codigoHTTP SMALLINT NOT NULL,
    mensagemErro TEXT,
    payloadJSON JSON,
    enderecoIPCliente VARCHAR(45),
    dataHoraRequisicao DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_nomeEndpointAPI (nomeEndpointAPI),
    INDEX idx_statusRequisiacao (statusRequisiacao),
    INDEX idx_dataHoraRequisicao (dataHoraRequisicao DESC),
    FOREIGN KEY (idUsuarioRequisicao) REFERENCES usuarios(idUsuario) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 9. TABELA: NOTIFICAÇÕES IN-SITE (Para Tarefa 5)
-- ============================================================================
-- Notificações para usuários sobre conquistas, ranking, etc
-- ============================================================================

CREATE TABLE IF NOT EXISTS notificacoes (
    idNotificacao INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    tipoNotificacao ENUM('conquista', 'ranking', 'sistema') NOT NULL,
    mensagemNotificacao VARCHAR(255) NOT NULL,
    foiLida TINYINT(1) DEFAULT 0,
    dataCriacaoNotificacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE,
    INDEX idx_idUsuario (idUsuario),
    INDEX idx_foiLida (foiLida),
    INDEX idx_dataCriacaoNotificacao (dataCriacaoNotificacao DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- 10. VIEW: RANKING DE USUÁRIOS
-- ============================================================================

CREATE OR REPLACE VIEW vw_ranking_usuarios AS
SELECT 
    ROW_NUMBER() OVER (ORDER BY u.pontuacaoTotal DESC) as posicaoRanking,
    u.idUsuario,
    u.nomeUsuario,
    u.pontuacaoTotal,
    CASE
        WHEN u.totalPartidas = 0 THEN 0
        ELSE ROUND((u.totalVitorias * 100.0) / u.totalPartidas, 2)
    END as taxaVitoriaPercental,
    u.nivelJogador,
    u.totalPartidas,
    u.totalVitorias,
    u.totalDerrotas,
    u.maiorStreak,
    u.dataCadastro,
    u.ultimoAcesso
FROM usuarios u
WHERE u.usuarioAtivo = TRUE
ORDER BY u.pontuacaoTotal DESC;

-- ============================================================================
-- 11. VIEW: PROGRESSO DE CONQUISTAS DO USUÁRIO
-- ============================================================================

CREATE OR REPLACE VIEW vw_progresso_conquistas_usuario AS
SELECT 
    u.idUsuario,
    u.nomeUsuario,
    COUNT(DISTINCT uc.idConquista) as conquistasDesbloqueadas,
    27 as totalConquistasDisponiveis,
    ROUND((COUNT(DISTINCT uc.idConquista) * 100.0) / 27, 2) as percentualProgressoConquista,
    GROUP_CONCAT(c.categoriaConquista SEPARATOR ',') as categoriasDesbloqueadas
FROM usuarios u
LEFT JOIN usuario_conquistas uc ON u.idUsuario = uc.idUsuario
LEFT JOIN conquistas c ON uc.idConquista = c.idConquista
WHERE u.usuarioAtivo = TRUE
GROUP BY u.idUsuario, u.nomeUsuario;

-- ============================================================================
-- 12. FUNÇÃO: Calcular Nível do Jogador
-- ============================================================================

DELIMITER //

CREATE FUNCTION IF NOT EXISTS calcularNivelJogador(totalPartidas INT)
RETURNS INT
DETERMINISTIC
BEGIN
    RETURN FLOOR(totalPartidas / 5) + 1;
END //

DELIMITER ;

-- ============================================================================
-- 13. TRIGGER: Atualizar Nível do Usuário
-- ============================================================================

DELIMITER //

CREATE TRIGGER IF NOT EXISTS tr_atualizar_nivelJogador_usuario
BEFORE UPDATE ON usuarios
FOR EACH ROW
BEGIN
    SET NEW.nivelJogador = FLOOR(NEW.totalPartidas / 5) + 1;
END //

DELIMITER ;

-- ============================================================================
-- 14. STORED PROCEDURE: Registrar Nova Partida
-- ============================================================================

DELIMITER //

CREATE PROCEDURE IF NOT EXISTS sp_registrar_novaPartida(
    IN p_idUsuario INT,
    IN p_resultadoPartida VARCHAR(10),
    IN p_pontuacaoPartida INT,
    IN p_duracaoSegundos INT,
    IN p_cartasJogadas INT,
    IN p_dinheiroAcumulado INT,
    IN p_dinheiroGasto INT,
    IN p_lixoReciclado INT,
    IN p_danoTotal INT,
    IN p_curaTotal INT,
    IN p_rodadasSobrevividas INT,
    OUT p_idPartida INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_idPartida = -1;
    END;
    
    START TRANSACTION;
    
    -- 1. Inserir partida
    INSERT INTO partidas (idUsuario, resultadoPartida, pontuacaoPartida, duracaoSegundos)
    VALUES (p_idUsuario, p_resultadoPartida, p_pontuacaoPartida, p_duracaoSegundos);
    
    SET p_idPartida = LAST_INSERT_ID();
    
    -- 2. Inserir estatísticas
    INSERT INTO estatisticas_partida (
        idPartida, cartasJogadas, dinheiroAcumulado, dinheiroGasto,
        lixoReciclado, danoTotal, curaTotal, rodadasSobrevividas
    ) VALUES (
        p_idPartida, p_cartasJogadas, p_dinheiroAcumulado, p_dinheiroGasto,
        p_lixoReciclado, p_danoTotal, p_curaTotal, p_rodadasSobrevividas
    );
    
    -- 3. Atualizar usuário
    UPDATE usuarios
    SET 
        totalPartidas = totalPartidas + 1,
        pontuacaoTotal = pontuacaoTotal + p_pontuacaoPartida,
        totalVitorias = totalVitorias + (CASE WHEN p_resultadoPartida = 'Vitoria' THEN 1 ELSE 0 END),
        totalDerrotas = totalDerrotas + (CASE WHEN p_resultadoPartida = 'Derrota' THEN 1 ELSE 0 END),
        dinheiroTotalAcumulado = dinheiroTotalAcumulado + p_dinheiroAcumulado,
        lixoTotalReciclado = lixoTotalReciclado + p_lixoReciclado
    WHERE idUsuario = p_idUsuario;
    
    COMMIT;
END //

DELIMITER ;

-- ============================================================================
-- 15. STORED PROCEDURE: Desbloquear Conquista
-- ============================================================================

DELIMITER //

CREATE PROCEDURE IF NOT EXISTS sp_desbloquearConquista(
    IN p_idUsuario INT,
    IN p_idConquista INT,
    IN p_idPartidaDesbloqueio INT,
    OUT p_conquistaDesbloqueada BOOLEAN
)
BEGIN
    INSERT IGNORE INTO usuario_conquistas (idUsuario, idConquista, idPartidaDesbloqueio)
    VALUES (p_idUsuario, p_idConquista, p_idPartidaDesbloqueio);
    
    IF ROW_COUNT() > 0 THEN
        SET p_conquistaDesbloqueada = TRUE;
    ELSE
        SET p_conquistaDesbloqueada = FALSE;
    END IF;
END //

DELIMITER ;

-- ============================================================================
-- 16. DADOS INICIAIS: 27 CONQUISTAS
-- ============================================================================

INSERT IGNORE INTO conquistas (nomeConquista, descricaoConquista, nomPersonagemConquista, categoriaConquista, iconeConquista, pontosBonusConquista) VALUES
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
('ECOLOGISTA', 'Recicle 50 itens de lixo', 'Qualquer', 'reciclagem', '♻️', 100),
('ALIADO DO PLANETA', 'Recicle 200 itens de lixo', 'Qualquer', 'reciclagem', '🌍', 150),
('PURIFICADOR', 'Recicle 500 itens de lixo', 'Qualquer', 'reciclagem', '✨', 200),
('MESTRE DA RECICLAGEM', 'Recicle 1000 itens de lixo', 'Qualquer', 'reciclagem', '🔄', 300),
('REDENTOR', 'Recicle 2000 itens de lixo', 'Qualquer', 'reciclagem', '⭐', 400),
('RESISTÊNCIA', 'Termina uma partida com 500+ de vida', 'Qualquer', 'vida', '❤️', 100),
('FORTALEZA', 'Termina uma partida com 1000+ de vida', 'Qualquer', 'vida', '🏰', 150),
('INDESTRUTÍVEL', 'Termina uma partida com 2000+ de vida', 'Qualquer', 'vida', '💎', 200),
('ESCUDO VALENTE', 'Acumule 500 de escudo', 'Qualquer', 'escudo', '⚔️', 100),
('PROTETOR', 'Acumule 1500 de escudo', 'Qualquer', 'escudo', '🛡️', 150),
('RIQUEZA', 'Acumule 10000 de dinheiro em uma partida', 'Qualquer', 'sinergia', '💰', 150),
('CONHECIMENTO', 'Desbloqueie todas as cartas de uma categoria', 'Qualquer', 'sinergia', '📚', 200),
('PODER', 'Combine 5 cartas de poder', 'Qualquer', 'sinergia', '⚡', 150),
('DOMINAÇÃO', 'Domine o campo de batalha (combinações perfeitas)', 'Qualquer', 'sinergia', '👑', 250);

-- ============================================================================
-- FIM DO SCHEMA v2.1
-- ============================================================================
-- Data: 2026-04-13
-- Status: ✅ CORRIGIDO - Pronto para produção
-- Mudanças: Nomes descritivos, erro data_expiração corrigido
-- ============================================================================
