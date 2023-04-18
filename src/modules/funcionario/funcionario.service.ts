import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export class FuncionarioService {
  constructor(private prisma: PrismaService) {}

  async remove(matricula: number) {
    const funcionarioExists = await this.prisma.funcionario.findFirst({
      where: {
        matricula: matricula,
      },
    });
    if (!funcionarioExists) throw new Error('Funcionário não encontrado!');
    const funcionario = await this.prisma.funcionario.delete({
      where: {
        matricula: matricula,
      },
    });
    return funcionario;
  }

  async update(matricula: number, data: Prisma.funcionarioUpdateInput) {
    const funcionarioExists = await this.prisma.funcionario.findFirst({
      where: {
        matricula: matricula,
      },
    });
    if (!funcionarioExists) throw new Error('Funcionário não encontrado!');
    const anosTrabalhados =
      new Date().getFullYear() -
      new Date(String(data.data_admissao)).getFullYear();

    const bonificacao = Number(
      (
        Number(data.salario) *
        0.02 *
        anosTrabalhados *
        Number(data.desempenho)
      ).toFixed(2),
    );
    const funcionario = await this.prisma.funcionario.update({
      where: {
        matricula: matricula,
      },
      data: {
        matricula: data.matricula,
        nome_completo: data.nome_completo,
        data_admissao: new Date(String(data.data_admissao)),
        salario: data.salario,
        data_pagamento: new Date(String(data.data_pagamento)),
        desempenho: data.desempenho,
        bonificacao,
      },
    });
    return funcionario;
  }

  async findOne(matricula: number) {
    const funcionario = await this.prisma.funcionario.findFirst({
      where: {
        matricula: matricula,
      },
    });
    if (!funcionario) throw new Error('Funcionário não encontrado!');
    return funcionario;
  }

  async findAll() {
    return await this.prisma.funcionario.findMany();
  }

  async create(data: Prisma.funcionarioCreateInput) {
    const funcionarioExists = await this.prisma.funcionario.findFirst({
      where: {
        matricula: data.matricula,
      },
    });
    if (funcionarioExists) throw new Error('Funcionário já cadastrado!');
    const anosTrabalhados =
      new Date().getFullYear() - new Date(data.data_admissao).getFullYear();
    const bonificacao = data.salario * 0.02 * anosTrabalhados * data.desempenho;
    console.log({
      matricula: data.matricula,
      nome_completo: data.nome_completo,
      data_admissao: new Date(data.data_admissao),
      salario: data.salario,
      data_pagamento: new Date(data.data_pagamento),
      desempenho: data.desempenho,
      bonificacao,
    });
    const funcionario = await this.prisma.funcionario.create({
      data: {
        matricula: data.matricula,
        nome_completo: data.nome_completo,
        data_admissao: new Date(data.data_admissao),
        salario: data.salario,
        data_pagamento: new Date(data.data_pagamento),
        desempenho: data.desempenho,
        bonificacao,
      },
    });

    return funcionario;
  }
}
