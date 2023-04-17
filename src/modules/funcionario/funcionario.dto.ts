/* eslint-disable prettier/prettier */
export interface FuncionarioDTO {
  matricula?: number;
  nome_completo: string;
  data_admissao: Date;
  salario: number;
  data_pagamento: Date;
  desempenho: number;
  bonificacao: number | null;
};
