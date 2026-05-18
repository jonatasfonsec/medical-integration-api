import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Pedido } from './entities/pedido.entity';

import { CreatePedidoDto } from './dto/create-pedido.dto';

import { BadRequestException } from '@nestjs/common';

@Injectable()
export class PedidosService {

  constructor(

    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,

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

    const pedido = this.pedidoRepository.create({

      ...createPedidoDto,

      integrado: false,

    });

    return this.pedidoRepository.save(pedido);
  }

  async findAll() {
    return this.pedidoRepository.find();
  }
}