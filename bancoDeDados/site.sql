CREATE TABLE user(
idUser INT PRIMARY KEY AUTO_INCREMENT UNIQUE ,
dataNascimento DATE NOT NULL, 
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



/*INSERÇÃO DOS USUARIOS */  
INSERT INTO user (userName, email, senha, dataNascimento, ultimoLogin, diaCriado)
VALUES
('james', 'james@email.com', '123456', '2024-08-10', CURDATE(), CURDATE()),
('gameleira', 'gameleira@email.com', '123456', '2024-08-10', CURDATE(), CURDATE()),
('pedrofarinha', 'pedrofarinha@email.com', '123456', '2024-08-10', CURDATE(), CURDATE()),
('nagano', 'nagano@gmail.com', '123456', '2024-08-10', CURDATE(), CURDATE());



/*	INSERCOES PEDIDAS*/ 
/*insercao de usuario no ranking */
INSERT INTO userStatus (idUser, ultimoLoginJogo, lixoTotal, lixoUnic, qtdWin, qtdJogo)
VALUES
(1, NOW(), 150, 60, 12, 30),   
(2, NOW(), 90, 35, 7, 20),    
(3, NOW(), 210, 80, 18, 45),  
(4, NOW(), 40, 15, 2, 10);     



/*CONFERIR RANKING */
SELECT user.userName, userstatus.lixoTotal FROM userstatus
JOIN user ON user.idUser = .userstatus.idUser
ORDER BY userstatus.lixoTotal DESC;

SELECT user.userName, userstatus.lixoUnic FROM userstatus
JOIN user ON user.idUser = .userstatus.idUser
ORDER BY userstatus.lixoUnic DESC;

SELECT * FROM user
SELECT * FROM userStatus