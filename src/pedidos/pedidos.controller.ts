import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';

import { PedidosService } from './pedidos.service';

import { CreatePedidoDto } from './dto/create-pedido.dto';

@Controller('pedidos')
export class PedidosController {

  constructor(
    private readonly pedidosService: PedidosService,
  ) { }

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.create(createPedidoDto);
  }
  @Get(':codigoPedido')
  findOne(
    @Param('codigoPedido', ParseIntPipe)
    codigoPedido: number,
  ) {

    return this.pedidosService.findOne(
      codigoPedido,
    );
  }
  @Get()
  findAll() {
    return this.pedidosService.findAll();
  }
}