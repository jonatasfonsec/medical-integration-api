import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ExamesService } from './exames.service';

import { ExamesController } from './exames.controller';

import { Exame } from './entities/exame.entity';

import { Pedido } from '../pedidos/entities/pedido.entity';

import { Documento } from '../documentos/entities/documento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Exame,
      Pedido,
      Documento,
    ]),
  ],

  controllers: [ExamesController],

  providers: [ExamesService],
})
export class ExamesModule {}