import {

  Controller,

  Get,

  Post,

  Body,

  Param,

  ParseIntPipe

} from '@nestjs/common';

import { DocumentosService } from './documentos.service';

import { CreateDocumentoDto }
  from './dto/create-documento.dto';

@Controller('documentos')
export class DocumentosController {

  constructor(
    private readonly documentosService:
      DocumentosService,
  ) { }

  @Post()
  create(
    @Body()
    createDocumentoDto: CreateDocumentoDto,
  ) {

    return this.documentosService.create(
      createDocumentoDto,
    );
  }

  @Get()
  findAll() {
    return this.documentosService.findAll();
  }

  @Get(':codigoPedido')
  findByPedido(
    @Param('codigoPedido', ParseIntPipe)
    codigoPedido: number,
  ) {

    return this.documentosService.findByPedido(
      codigoPedido,
    );
  }
}