-- ============================================================================
-- GAEA PROTOCOL - SCHEMA CONSOLIDADO
-- ============================================================================
-- Banco de dados único e definitivo para o sistema
-- Data: 15 de Abril de 2026
-- ============================================================================

-- ============================================================================
-- CRIAR BANCO DE DADOS
-- ============================================================================

DROP DATABASE IF EXISTS gaea;
CREATE DATABASE gaea CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gaea;

-- ============================================================================
-- TABELA: USUÁRIOS
-- ============================================================================
-- Armazena informações básicas dos usuários do sistema

CREATE TABLE usuarios (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT COMMENT 'ID único do usuário',
    nomeUsuario VARCHAR(50) NOT NULL UNIQUE COMMENT 'Nome de usuário (login)',
    email VARCHAR(100) NOT NULL UNIQUE COMMENT 'Email do usuário',
    senhaHash VARCHAR(255) NOT NULL COMMENT 'Senha criptografada com bcrypt',
    Avatar VARCHAR(255) DEFAULT NULL COMMENT 'Caminho ou ID do avatar',
    tipoUsuario ENUM('jogador', 'admin') DEFAULT 'jogador' COMMENT 'Nível de acesso',
    
    -- Estatísticas básicas
    pontuacaoTotal INT DEFAULT 0 COMMENT 'Pontuação acumulada',
    totalPartidas INT DEFAULT 0 COMMENT 'Total de partidas jogadas',
    totalVitorias INT DEFAULT 0 COMMENT 'Total de vitórias',
    totalDerrotas INT DEFAULT 0 COMMENT 'Total de derrotas',
    maiorStreak INT DEFAULT 0 COMMENT 'Maior sequência de vitórias',
    lixoReciclado INT DEFAULT 0 COMMENT 'Total de lixo reciclado',
    
    -- Controle
    usuarioAtivo BOOLEAN DEFAULT TRUE COMMENT 'Conta ativa/inativa',
    dataCadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data de criação',
    ultimoAcesso TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP COMMENT 'Último login',
    
    -- Índices para performance
    INDEX idx_email (email),
    INDEX idx_nomeUsuario (nomeUsuario),
    INDEX idx_pontuacao (pontuacaoTotal DESC),
    INDEX idx_dataCadastro (dataCadastro DESC)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tabela principal de usuários';

-- ============================================================================
-- TABELA: PARTIDAS
-- ============================================================================
-- Histórico de todas as partidas jogadas
-- Constraints de idempotência: session_token UNIQUE evita duplicatas mesmo com retry do frontend

CREATE TABLE partidas (
    idPartida INT PRIMARY KEY AUTO_INCREMENT COMMENT 'ID único da partida',
    idUsuario INT NOT NULL COMMENT 'ID do usuário',
    resultado ENUM('vitoria', 'derrota') NOT NULL COMMENT 'Resultado final (minúsculas)',
    
    -- Dados da partida
    pontuacao INT DEFAULT 0 COMMENT 'Pontos obtidos',
    lixoColetado INT DEFAULT 0 COMMENT 'Lixo reciclado',
    wavesCompletadas INT DEFAULT 0 COMMENT 'Número de waves',
    duracaoSegundos INT DEFAULT 0 COMMENT 'Duração em segundos',
    dificuldade VARCHAR(50) DEFAULT 'normal' COMMENT 'Nível de dificuldade',
    protocolo VARCHAR(50) DEFAULT NULL COMMENT 'Protocolo utilizado',
    
    -- Idempotência: token único previne duplicatas
    session_token VARCHAR(64) UNIQUE DEFAULT NULL COMMENT 'UUID da sessão para garantir idempotência',
    
    -- Controle
    dataPartida TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Data/hora da partida',
    
    -- Relacionamentos e índices
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE,
    INDEX idx_idUsuario (idUsuario),
    INDEX idx_resultado (resultado),
    INDEX idx_dataPartida (dataPartida DESC),
    INDEX idx_pontuacao (pontuacao DESC),
    INDEX idx_session_token (session_token)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Histórico de partidas (com proteção contra duplicatas)';

-- ============================================================================
-- TABELA: ESTATÍSTICAS DETALHADAS DAS PARTIDAS
-- ============================================================================
-- Dados complementares de cada partida para análise mais profunda

CREATE TABLE estatisticas_partida (
    idEstatistica INT PRIMARY KEY AUTO_INCREMENT,
    idPartida INT NOT NULL UNIQUE,
    cartas_jogadas INT DEFAULT 0,
    lixo_reciclado INT DEFAULT 0,
    rodadas_sobrevividas INT DEFAULT 0,
    dano_total INT DEFAULT 0,
    cura_total INT DEFAULT 0,
    itens_coletados INT DEFAULT 0,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (idPartida) REFERENCES partidas(idPartida) ON DELETE CASCADE,
    INDEX idx_idPartida (idPartida)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Estatísticas detalhadas de partidas';

-- ============================================================================
-- TABELA: LOG DE AUTENTICAÇÃO
-- ============================================================================
-- Registro de eventos de login/logout para auditoria

CREATE TABLE log_autenticacao (
    idLogAutenticacao INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT DEFAULT NULL,
    nomeUsuario VARCHAR(50) DEFAULT NULL,
    tipoEvento ENUM('login', 'logout', 'falha_login', 'session_expire') NOT NULL,
    enderecoIPCliente VARCHAR(45),
    userAgent VARCHAR(255),
    mensagemEvento VARCHAR(255),
    dataHoraEvento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE SET NULL,
    INDEX idx_idUsuario (idUsuario),
    INDEX idx_tipoEvento (tipoEvento),
    INDEX idx_dataHoraEvento (dataHoraEvento DESC),
    INDEX idx_nomeUsuario (nomeUsuario)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Auditoria de eventos de autenticação';

-- ============================================================================
-- TABELA: CONQUISTAS (ENGINE)
-- ============================================================================
-- Sistema baseado em regras para achievements dinâmicos
-- Tipos: score, vitorias, cartas_jogadas, lixo_coletado, etc

CREATE TABLE conquistas (
    idConquista INT PRIMARY KEY AUTO_INCREMENT,
    nomeConquista VARCHAR(100) NOT NULL,
    descricaoConquista TEXT,
    categoriaConquista VARCHAR(50) DEFAULT 'geral',
    nomPersonagemConquista VARCHAR(50) DEFAULT NULL COMMENT 'Personagem específico ou NULL para global',
    iconeConquista VARCHAR(255) DEFAULT NULL,
    pontosBonusConquista INT DEFAULT 10,
    
    -- Engine
    tipo ENUM('score', 'vitorias', 'cartas_jogadas', 'lixo_coletado', 'streak', 'custom') DEFAULT 'custom',
    meta INT DEFAULT 1 COMMENT 'Meta a ser atingida',
    
    dataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ativa BOOLEAN DEFAULT TRUE,
    
    INDEX idx_nomeConquista (nomeConquista),
    INDEX idx_tipo (tipo),
    INDEX idx_categoria (categoriaConquista)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Definições de conquistas (baseadas em engine)';

-- ============================================================================
-- TABELA: USUÁRIO_CONQUISTAS (COM PROGRESSO)
-- ============================================================================
-- Relacionamento: qual usuário desbloqueou qual conquista
-- Com suporte a progresso parcial

CREATE TABLE usuario_conquistas (
    idRelacao INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    idConquista INT NOT NULL,
    progresso INT DEFAULT 0 COMMENT 'Valor atual do progresso',
    desbloqueada BOOLEAN DEFAULT FALSE,
    dataDesbloqueio TIMESTAMP NULL COMMENT 'NULL se ainda não desbloqueada',
    dataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario) ON DELETE CASCADE,
    FOREIGN KEY (idConquista) REFERENCES conquistas(idConquista) ON DELETE CASCADE,
    UNIQUE KEY unique_user_achievement (idUsuario, idConquista),
    INDEX idx_idUsuario (idUsuario),
    INDEX idx_idConquista (idConquista),
    INDEX idx_desbloqueada (desbloqueada),
    INDEX idx_dataDesbloqueio (dataDesbloqueio DESC)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Conquistas do usuário (com rastreamento de progresso)';


-- ============================================================================
-- INSERÇÃO DE DADOS DE TESTE
-- ============================================================================

-- Usuário admin (hash: Admin@12345)
INSERT INTO usuarios (nomeUsuario, email, senhaHash, tipoUsuario) VALUES (
    'admin',
    'admin@example.com',
    '$2y$12$KIXvMmqUKPxdfIYXUykvN.wnHvTJe0yDQR1YF8D8pTRZNWqJVN.d2',
    'admin'
);

-- Usuário de teste (hash: Teste@123)
INSERT INTO usuarios (nomeUsuario, email, senhaHash, tipoUsuario) VALUES (
    'testuser',
    'user@example.com',
    '$2y$12$7EqnT9L1wN4F6C3PmK8bWuZ5L2Q9jV6X3R7S4H1D1G2F5K8L3Z9Y',
    'jogador'
);

-- Inserir conquistas com engine de tipos
INSERT INTO conquistas (nomeConquista, descricaoConquista, categoriaConquista, tipo, meta, pontosBonusConquista) VALUES
('Primeiro Passo', 'Complete sua primeira partida', 'geral', 'custom', 1, 10),
('Coletor de Lixo', 'Recicle 1000 de lixo', 'geral', 'lixo_coletado', 1000, 25),
('Mestre dos Protocolos', 'Vença 10 partidas consecutivas', 'geral', 'streak', 10, 50),
('Protetor do Planeta', 'Obtenha 100000 pontos totais', 'geral', 'score', 100000, 100),
('Sete Vidas', 'Complete 7 partidas', 'geral', 'vitorias', 7, 15),
('Mago das Cartas', 'Jogue 500 cartas em total', 'geral', 'cartas_jogadas', 500, 30);

-- Criar relacionamento inicial (sem desbloqueio)
INSERT INTO usuario_conquistas (idUsuario, idConquista, progresso, desbloqueada) 
SELECT u.idUsuario, c.idConquista, 0, FALSE
FROM usuarios u, conquistas c;

-- ============================================================================
-- TRIGGER: Atualizar estatísticas ao registrar partida
-- ============================================================================

DELIMITER //

CREATE TRIGGER atualiza_stats_usuario AFTER INSERT ON partidas
FOR EACH ROW
BEGIN
    DECLARE vitoria_valor INT DEFAULT 0;
    
    SET vitoria_valor = CASE WHEN NEW.resultado = 'vitoria' THEN 1 ELSE 0 END;
    
    UPDATE usuarios SET
        totalPartidas = totalPartidas + 1,
        totalVitorias = totalVitorias + vitoria_valor,
        totalDerrotas = CASE WHEN NEW.resultado = 'derrota' THEN totalDerrotas + 1 ELSE totalDerrotas END,
        pontuacaoTotal = pontuacaoTotal + COALESCE(NEW.pontuacao, 0),
        lixoReciclado = lixoReciclado + COALESCE(NEW.lixoColetado, 0)
    WHERE idUsuario = NEW.idUsuario;
END //

DELIMITER ;

-- ============================================================================
-- ENGINE DE CONQUISTAS
-- ============================================================================
-- Atualizações automáticas de progresso de conquistas ao salvar partida.


DELIMITER //

CREATE TRIGGER atualiza_conquistas_usuario AFTER INSERT ON partidas
FOR EACH ROW
BEGIN
    -- Atualizar progresso de conquista por lixo coletado
    UPDATE usuario_conquistas SET
        progresso = progresso + NEW.lixoColetado
    WHERE idUsuario = NEW.idUsuario
      AND idConquista IN (SELECT idConquista FROM conquistas WHERE tipo = 'lixo_coletado')
      AND desbloqueada = FALSE;
    
    -- Atualizar progresso de conquista por pontuação
    UPDATE usuario_conquistas SET
        progresso = progresso + NEW.pontuacao
    WHERE idUsuario = NEW.idUsuario
      AND idConquista IN (SELECT idConquista FROM conquistas WHERE tipo = 'score')
      AND desbloqueada = FALSE;
      
    -- Desbloquear conquistas que atingiram meta
    UPDATE usuario_conquistas uc
    JOIN conquistas c ON uc.idConquista = c.idConquista
    SET uc.desbloqueada = TRUE, uc.dataDesbloqueio = NOW()
    WHERE uc.idUsuario = NEW.idUsuario
      AND uc.progresso >= c.meta
      AND uc.desbloqueada = FALSE;
END 

DELIMITER ;

COMMIT;
