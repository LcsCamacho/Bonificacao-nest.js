import {
  Body,
  Post,
  Delete,
  Controller,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { Prisma } from '@prisma/client';

@Controller('funcionario')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Post()
  async create(@Body() data: Prisma.funcionarioCreateInput) {
    return await this.funcionarioService.create(data);
  }

  @Get()
  async findAll() {
    return await this.funcionarioService.findAll();
  }

  @Get('/:matricula')
  async findOne(@Param('matricula') matricula: string) {
    return await this.funcionarioService.findOne(Number(matricula));
  }

  @Put('/:matricula')
  async update(
    @Param('matricula') matricula: string,
    @Body() data: Prisma.funcionarioUpdateInput,
  ) {
    return await this.funcionarioService.update(Number(matricula), data);
  }

  @Delete('/:matricula')
  async remove(@Param('matricula') matricula: string) {
    return await this.funcionarioService.remove(Number(matricula));
  }
}
