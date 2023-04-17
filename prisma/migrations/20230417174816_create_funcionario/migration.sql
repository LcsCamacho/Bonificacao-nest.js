-- CreateTable
CREATE TABLE `funcionario` (
    `matricula` INTEGER NOT NULL,
    `nome_completo` VARCHAR(191) NOT NULL,
    `data_admissao` DATETIME(3) NOT NULL,
    `salario` DOUBLE NOT NULL,
    `data_pagamento` DATETIME(3) NOT NULL,
    `desempenho` DOUBLE NOT NULL,
    `bonificacao` DOUBLE NULL,

    PRIMARY KEY (`matricula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
