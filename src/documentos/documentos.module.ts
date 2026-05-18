import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { DocumentosService } from './documentos.service';
import { DocumentosController } from './documentos.controller';

import { Documento } from './entities/documento.entity';

import { Pedido } from '../pedidos/entities/pedido.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Documento,
      Pedido,
    ]),
  ],

  controllers: [DocumentosController],

  providers: [DocumentosService],
})
export class DocumentosModule {}