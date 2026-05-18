import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Pedido } from './entities/pedido.entity';

import { CreatePedidoDto } from './dto/create-pedido.dto';

import { BadRequestException } from '@nestjs/common';

import { Exame } from '../exames/entities/exame.entity';

@Injectable()
export class PedidosService {


  constructor(

    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,

    @InjectRepository(Exame)
    private exameRepository: Repository<Exame>,

  ) { }



  async create(createPedidoDto: CreatePedidoDto) {

    const pedidoExistente = await this.pedidoRepository.findOne({
      where: {
        codigoPedido: createPedidoDto.codigoPedido,
      },
    });

    if (pedidoExistente) {
      throw new BadRequestException(
        'Pedido já cadastrado',
      );
    }

    const exameExistente =
      await this.exameRepository.findOne({

        where: {
          accessionNumber:
            createPedidoDto.accessionNumber,
        },
      });


    const pedido = this.pedidoRepository.create({

      ...createPedidoDto,

      integrado: !!exameExistente
    });

    return this.pedidoRepository.save(pedido);
  }

  async findOne(codigoPedido: number) {

    return this.pedidoRepository.findOne({
      where: {
        codigoPedido,
      },
    });
  }

  async findAll() {
    return this.pedidoRepository.find();
  }
}