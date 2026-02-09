CREATE PROCEDURE attEstoqueAluguel(IN idCli int, idFunc int, idItem int, qtdItens int, valorIT DECIMAL(10,2), valorUNI DECIMAL(10,2))
UPDATE equipamento 
SET quantidade = quantidade - qtdItens
WHERE idEquipamento = idItem;

INSERT INTO aluguel (idCliente, idFuncionario, dataHoraRetirada)
VALUES (idCli, idFunc, CURDATE());

INSERT INTO aluguelEquipamento (idEquipamento, idAluguel, valorItem, valorUnitario, qtd)
VALUES (idItem, LAST_INSERT_ID(), valorIT, valorUNI, qtdItens);

CALL attEstoqueAluguel();