import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';

import { Pedido } from './entities/pedido.entity';

import { Exame } from '../exames/entities/exame.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, Exame]),
  ],

  controllers: [PedidosController],

  providers: [PedidosService],
})
export class PedidosModule {}