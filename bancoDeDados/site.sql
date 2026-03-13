-- user table definition (senha length increased for bcrypt hashes)
CREATE TABLE user(
    idUser INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
    dataNascimento DATE NULL,
    userName VARCHAR(45) NOT NULL UNIQUE,
    email VARCHAR(45) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,    -- changed from VARCHAR(45) to 255
    fotoPerfil VARCHAR(255) NULL,
    ultimoLogin DATETIME NOT NULL,
    diaCriado DATETIME NOT NULL
);
 


CREATE TABLE conquistas(
idConquista INT PRIMARY KEY AUTO_INCREMENT UNIQUE, 
idUser INT NOT NULL,
nomeConquista VARCHAR (50) NOT NULL,
concluido BIT NOT NULL,
premio VARCHAR(100) NOT NULL,
dsc VARCHAR(100) NOT NULL,
concluidoDia DATETIME,
progresso INT,

FOREIGN KEY (idUser) REFERENCES user(idUser)
);



CREATE TABLE userStatus (
idUserStatus INT PRIMARY KEY AUTO_INCREMENT NOT NULL UNIQUE,
idUser INT NOT NULL,
ultimoLoginJogo DATETIME NOT NULL,
lixoTotal INT,
lixoUnic INT,
qtdWin INT,
qtdJogo INT,
 
FOREIGN KEY (idUser) REFERENCES user(idUser)
);



CREATE TABLE partidas (
idPartida INT PRIMARY KEY AUTO_INCREMENT NOT NULL UNIQUE,
idUser INT NOT NULL,
dataPartida DATETIME NOT NULL,
resultado VARCHAR(20) NOT NULL,
lixoColetado INT,
wavesCompletadas INT,
tempoJogo INT,
protocoloUsado VARCHAR(50),
dificuldade VARCHAR(20),

FOREIGN KEY (idUser) REFERENCES user(idUser)
);



CREATE TABLE password_resets (
    idUser INT NOT NULL,
    tokenHash VARCHAR(255) NOT NULL UNIQUE,
    codigo VARCHAR(6) NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME NOT NULL,
    tentativas INT DEFAULT 0,

    FOREIGN KEY (idUser) REFERENCES user(idUser)
);

/* additional schema from anotacoes.txt */
CREATE TABLE perfil (
    idPerfil INT PRIMARY KEY AUTO_INCREMENT,
    nomePerfil VARCHAR(50) NOT NULL UNIQUE,
    descricaoPerfil VARCHAR(255)
);

CREATE TABLE usuarioPerfil (
    idUsuarioPerfil INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    idPerfil INT NOT NULL,
    CONSTRAINT fk_usuarioPerfil_usuario FOREIGN KEY (idUsuario) REFERENCES user(idUser),
    CONSTRAINT fk_usuarioPerfil_perfil FOREIGN KEY (idPerfil) REFERENCES perfil(idPerfil)
);

CREATE TABLE loginLog (
    idLoginLog INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT,
    emailTentativa VARCHAR(100),
    dataTentativa DATETIME NOT NULL,
    ipTentativa VARCHAR(45) NOT NULL,
    sucesso BIT NOT NULL,
    CONSTRAINT fk_loginLog_usuario FOREIGN KEY (idUsuario) REFERENCES user(idUser)
);

CREATE TABLE sessaoUsuario (
    idSessao INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    tokenSessao VARCHAR(255) NOT NULL UNIQUE,
    dataCriacao DATETIME NOT NULL,
    dataExpiracao DATETIME NOT NULL,
    ipCriacao VARCHAR(45) NOT NULL,
    CONSTRAINT fk_sessaoUsuario_usuario FOREIGN KEY (idUsuario) REFERENCES user(idUser)
);



/* INSERÇÃO DOS USUARIOS */
-- NOTE: if you ran the old script before increasing the 'senha' column,
-- the hashes were truncated.  After altering the column length you may
-- need to delete/reinsert these sample records or re-run this insert.
INSERT INTO user (userName, email, senha, dataNascimento, ultimoLogin, diaCriado)
VALUES
('james', 'james@email.com', '$2y$12$8zqpTVMzN4eQqzH9Y0K2wODaVVVkVVVkVVVkVVVkVVVkVVVkVVVkV', '2024-08-10', CURDATE(), CURDATE()),
('gameleira', 'gameleira@email.com', '$2y$12$8zqpTVMzN4eQqzH9Y0K2wODaVVVkVVVkVVVkVVVkVVVkVVVkVVVkV', '2024-08-10', CURDATE(), CURDATE()),
('pedrofarinha', 'pedrofarinha@email.com', '$2y$12$8zqpTVMzN4eQqzH9Y0K2wODaVVVkVVVkVVVkVVVkVVVkVVVkVVVkV', '2024-08-10', CURDATE(), CURDATE()),
('nagano', 'nagano@gmail.com', '$2y$12$8zqpTVMzN4eQqzH9Y0K2wODaVVVkVVVkVVVkVVVkVVVkVVVkVVVkV', '2024-08-10', CURDATE(), CURDATE()),
('admin', 'admin@gaea.com', '$2y$12$xjVp7OdADkp6yibixfq7c.UOqdUA0HB2ont29fEIpAE8R2m7yyPyS', NULL, CURDATE(), CURDATE());



/*	INSERCOES PEDIDAS*/ 
/*insercao de usuario no ranking */
INSERT INTO userStatus (idUser, ultimoLoginJogo, lixoTotal, lixoUnic, qtdWin, qtdJogo)
VALUES
(1, NOW(), 150, 60, 12, 30),   
(2, NOW(), 90, 35, 7, 20),    
(3, NOW(), 210, 80, 18, 45),  
(4, NOW(), 40, 15, 2, 10);     



/*INSERÇÃO DE PARTIDAS DE EXEMPLO*/
INSERT INTO partidas (idUser, dataPartida, resultado, lixoColetado, wavesCompletadas, tempoJogo, protocoloUsado, dificuldade)
VALUES
(1, NOW() - INTERVAL 2 DAY, 'Vitória', 150, 10, 1800, 'Gleba', 'Normal'),
(1, NOW() - INTERVAL 3 DAY, 'Derrota', 85, 5, 900, 'Glacial', 'Difícil'),
(1, NOW() - INTERVAL 5 DAY, 'Vitória', 120, 8, 1500, 'Gleba', 'Normal'),
(2, NOW() - INTERVAL 1 DAY, 'Vitória', 90, 7, 1400, 'Inferno', 'Normal'),
(2, NOW() - INTERVAL 4 DAY, 'Derrota', 45, 3, 600, 'Glacial', 'Difícil'),
(3, NOW() - INTERVAL 1 DAY, 'Vitória', 210, 12, 2100, 'Gleba', 'Difícil'),
(3, NOW() - INTERVAL 2 DAY, 'Vitória', 175, 10, 1800, 'Gleba', 'Normal');



/*CONFERIR RANKING */
SELECT user.userName, userstatus.lixoTotal FROM userstatus
JOIN user ON user.idUser = userstatus.idUser
ORDER BY userstatus.lixoTotal DESC;

SELECT user.userName, userstatus.lixoUnic FROM userstatus
JOIN user ON user.idUser = userstatus.idUser
ORDER BY userstatus.lixoUnic DESC;

SELECT * FROM user;
SELECT * FROM userStatus;