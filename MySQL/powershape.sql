-- MySQL Script gerado a partir do seu dump phpMyAdmin
-- Este script irá criar o banco de dados 'tcc' (se não existir),
-- criar as tabelas 'usuarios', 'treinos', 'exercicios' e 'treino_exercicios',
-- inserir os dados fornecidos e definir as restrições diretamente na criação das tabelas.

-- Configurações iniciais
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00"; -- Define o fuso horário

-- Criação do banco de dados (se não existir)
CREATE DATABASE IF NOT EXISTS `tcc` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `tcc`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--
CREATE TABLE `usuarios` (
  `ID_USUARIO` INT(11) NOT NULL AUTO_INCREMENT,
  `NOME_PR` VARCHAR(80) DEFAULT NULL,
  `NOME_SE` VARCHAR(80) DEFAULT NULL,
  `EMAIL` VARCHAR(80) DEFAULT NULL,
  `SENHA` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`ID_USUARIO`),
  UNIQUE KEY `EMAIL` (`EMAIL`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--
INSERT INTO `usuarios` (`ID_USUARIO`, `NOME_PR`, `NOME_SE`, `EMAIL`, `SENHA`) VALUES
(9, 'Carlos', 'Vinícius', 'cayuhe232@gmail.com', '$2y$10$0br/4QhgAMnUGHVqPsJqDeAeLgvflJ6qAOvU6WW9TJo.9eF486PH6'),
(10, 'Pérola', 'Sei la', 'pearl@gmail.com', '$2y$10$LrPh6myIWbyvh3XzsvG78.I8bMjk5qi22S/uKqeUojWMZKN/LN6cy');

-- --------------------------------------------------------

--
-- Estrutura para tabela `treinos`
--
CREATE TABLE `treinos` (
  `ID_TREINO` INT(11) NOT NULL AUTO_INCREMENT,
  `ID_USUARIO` INT(11) NOT NULL,
  `NOME` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`ID_TREINO`),
  KEY `ID_USUARIO` (`ID_USUARIO`),
  CONSTRAINT `treinos_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuarios` (`ID_USUARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `treinos`
--
INSERT INTO `treinos` (`ID_TREINO`, `ID_USUARIO`, `NOME`) VALUES
(13, 10, 'Treino de perna');

-- --------------------------------------------------------

--
-- Estrutura para tabela `exercicios`
--
CREATE TABLE `exercicios` (
  `ID_EXERCICIO` INT(11) NOT NULL AUTO_INCREMENT,
  `ID_USUARIO` INT(11) DEFAULT NULL,
  `NOME` VARCHAR(80) DEFAULT NULL,
  `DESCRICAO` TEXT DEFAULT NULL,
  `TIPO` ENUM('TEMPO','REPETICAO') DEFAULT NULL,
  `TEMPO_SEGUNDOS` INT(11) DEFAULT NULL,
  `QUANT_REPETICAO` INT(11) DEFAULT NULL,
  `ID_TREINO` INT(11) DEFAULT NULL,
  PRIMARY KEY (`ID_EXERCICIO`),
  KEY `ID_USUARIO` (`ID_USUARIO`),
  KEY `FK_EXERCICIO_TREINO` (`ID_TREINO`),
  CONSTRAINT `exercicios_ibfk_1` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuarios` (`ID_USUARIO`),
  CONSTRAINT `FK_EXERCICIO_TREINO` FOREIGN KEY (`ID_TREINO`) REFERENCES `treinos` (`ID_TREINO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `exercicios`
--
INSERT INTO `exercicios` (`ID_EXERCICIO`, `ID_USUARIO`, `NOME`, `DESCRICAO`, `TIPO`, `TEMPO_SEGUNDOS`, `QUANT_REPETICAO`, `ID_TREINO`) VALUES
(10, 10, 'Agachamento', 'Fazer posição de cagar', 'REPETICAO', NULL, 40, 13),
(11, 10, 'Posição do tigre', 'Outra que oarece que ta cagando', 'TEMPO', 60, NULL, 13),
(12, 10, 'Prancha', 'Nem é perna porra kkkkkk', 'TEMPO', 180, NULL, 13);

-- --------------------------------------------------------

--
-- Estrutura para tabela `treino_exercicios`
--
CREATE TABLE `treino_exercicios` (
  `ID_TREEXER` INT(11) NOT NULL AUTO_INCREMENT,
  `ID_TREINO` INT(11) NOT NULL,
  `ID_EXERCICIO` INT(11) NOT NULL,
  `QUANTIDADE_PERSONALIZADA` INT(11) DEFAULT NULL,
  PRIMARY KEY (`ID_TREEXER`),
  KEY `ID_TREINO` (`ID_TREINO`),
  KEY `ID_EXERCICIO` (`ID_EXERCICIO`),
  CONSTRAINT `treino_exercicios_ibfk_1` FOREIGN KEY (`ID_TREINO`) REFERENCES `treinos` (`ID_TREINO`),
  CONSTRAINT `treino_exercicios_ibfk_2` FOREIGN KEY (`ID_EXERCICIO`) REFERENCES `exercicios` (`ID_EXERCICIO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

COMMIT;
