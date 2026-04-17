/**
 * MIGRATION: Expansão de tabelas para API de Partidas
 * Arquivo: migration_partidas_api.sql
 * Descrição: Atualiza schema para suportar registro detalhado de partidas
 * Data: 2026-04-13
 * 
 * Este arquivo deve ser executado uma única vez no banco de dados.
 * Adiciona novos campos à tabela partidas e cria a tabela estatisticas_partida.
 */

-- ============================================================
-- 1. ATUALIZAR TABELA: partidas
-- ============================================================
-- Adiciona campos necessários se não existirem
ALTER TABLE partidas 
ADD COLUMN IF NOT EXISTS pontuacao INT DEFAULT 0 AFTER lixoColetado,
ADD COLUMN IF NOT EXISTS duracao_segundos INT DEFAULT 0 AFTER tempoJogo,
ADD COLUMN IF NOT EXISTS data_hora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER dataPartida;

-- ============================================================
-- 2. CRIAR TABELA: estatisticas_partida
-- ============================================================
-- Armazena estatísticas detalhadas de cada partida
CREATE TABLE IF NOT EXISTS estatisticas_partida (
    idEstatistica INT PRIMARY KEY AUTO_INCREMENT NOT NULL UNIQUE,
    idPartida INT NOT NULL UNIQUE,
    
    -- Estatísticas de cartas
    cartas_jogadas INT DEFAULT 0,
    cartas_coletadas INT DEFAULT 0,
    
    -- Estatísticas de dinheiro
    dinheiro_acumulado INT DEFAULT 0,
    dinheiro_gasto INT DEFAULT 0,
    dinheiro_final INT DEFAULT 0,
    
    -- Estatísticas de lixo/reciclagem
    lixo_reciclado INT DEFAULT 0,
    
    -- Estatísticas de combate
    dano_total INT DEFAULT 0,
    cura_total INT DEFAULT 0,
    escudo_total INT DEFAULT 0,
    rodadas_sobrevividas INT DEFAULT 0,
    
    -- Metadados
    protocolo_usado VARCHAR(50) DEFAULT NULL,
    personagem_usado VARCHAR(50) DEFAULT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign Key
    FOREIGN KEY (idPartida) REFERENCES partidas(idPartida) ON DELETE CASCADE,
    
    -- Índices para performance
    INDEX idx_partida (idPartida),
    INDEX idx_data (data_criacao)
);

-- ============================================================
-- 3. ATUALIZAR TABELA: userStatus (se necessário)
-- ============================================================
-- Garante campos para acumulação de estatísticas
ALTER TABLE userStatus 
ADD COLUMN IF NOT EXISTS total_partidas INT DEFAULT 0 AFTER qtdJogo,
ADD COLUMN IF NOT EXISTS total_vitorias INT DEFAULT 0 AFTER qtdWin,
ADD COLUMN IF NOT EXISTS pontuacao_total INT DEFAULT 0 AFTER total_vitorias,
ADD COLUMN IF NOT EXISTS dano_total_acumulado INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS cura_total_acumulada INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS lixo_total_acumulado INT DEFAULT 0;

-- ============================================================
-- 4. CRIAR ÍNDICES PARA PERFORMANCE
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_partidas_idUser ON partidas(idUser);
CREATE INDEX IF NOT EXISTS idx_partidas_resultado ON partidas(resultado);
CREATE INDEX IF NOT EXISTS idx_partidas_data_hora ON partidas(data_hora);
CREATE INDEX IF NOT EXISTS idx_userStatus_idUser ON userStatus(idUser);

-- ============================================================
-- Fim da Migration
-- ============================================================
