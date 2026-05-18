import {

  Controller,

  Get,

  Post,

  Body,

  Param

} from '@nestjs/common';

import { ExamesService } from './exames.service';

import { CreateExameDto }
  from './dto/create-exame.dto';

@Controller('exames')
export class ExamesController {

  constructor(
    private readonly examesService:
      ExamesService,
  ) { }

  @Post()
  create(
    @Body()
    createExameDto: CreateExameDto,
  ) {

    return this.examesService.create(
      createExameDto,
    );
  }

  @Get(':accessionNumber')
  findByAccession(
    @Param('accessionNumber')
    accessionNumber: string,
  ) {

    return this.examesService.findByAccession(
      accessionNumber,
    );
  }

  @Get()
  findAll() {
    return this.examesService.findAll();
  }
}