CREATE TABLE userr(
idUser INT PRIMARY KEY AUTO_INCREMENT UNIQUE ,
dataNascimento INT NOT NULL, 
userName VARCHAR(45) NOT NULL UNIQUE,
email VARCHAR(45) NOT NULL UNIQUE ,
senha VARCHAR(45) NOT NULL,
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

FOREIGN KEY (idUser) REFERENCES userr(idUser)
);



CREATE TABLE userStatus (
idUserStatus INT PRIMARY KEY AUTO_INCREMENT NOT NULL UNIQUE,
idUser INT NOT NULL,
ultimoLoginJogo DATETIME NOT NULL,
lixoTotal INT,
lixoUnic INT,
qtdWin INT,
qtdJogo INT,
 
FOREIGN KEY (idUser) REFERENCES userr(idUser)
);



/*INSERÇÃO DOS USUARIOS */  
INSERT INTO userr (userName, email, senha, dataNascimento, ultimoLogin, diaCriado)
VALUES
('james', 'james@email.com', '123456', '2024-08-10', CURDATE(), CURDATE()),
('gameleira', 'gameleira@email.com', '123456', '2024-08-10', CURDATE(), CURDATE()),
('pedrofarinha', 'pedrofarinha@email.com', '123456', '2024-08-10', CURDATE(), CURDATE()),
('nagano', 'nagano@gmail.com', '123456', '2024-08-10', CURDATE(), CURDATE());

SELECT * FROM userr
SELECT * FROM userStatus
 
/*CONFERIR RANKING */
SELECT userr.userName, userstatus.lixoTotal FROM userstatus
JOIN userr ON userr.idUser = .userstatus.idUser
ORDER BY userstatus.lixoTotal DESC;