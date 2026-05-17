import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidosModule } from './pedidos/pedidos.module';
import { DocumentosModule } from './documentos/documentos.module';
import { ExamesModule } from './exames/exames.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',

      database: 'data/database.sqlite',

      entities: [__dirname + '/**/*.entity{.ts,.js}'],

      synchronize: true,
    }),
    PedidosModule,
    DocumentosModule,
    ExamesModule,
  ],
})
export class AppModule {}