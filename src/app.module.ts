import { Module } from '@nestjs/common';
import { FuncionarioModule } from './modules/funcionario/funcionario.module';

@Module({
  imports: [FuncionarioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
