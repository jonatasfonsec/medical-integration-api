import {

  Injectable,

  BadRequestException,

  NotFoundException,

} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Documento } from './entities/documento.entity';

import { Pedido } from '../pedidos/entities/pedido.entity';

import { CreateDocumentoDto } from './dto/create-documento.dto';

@Injectable()
export class DocumentosService {

  constructor(

    @InjectRepository(Documento)
    private documentoRepository: Repository<Documento>,

    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,

  ) { }

  async create(createDocumentoDto: CreateDocumentoDto) {

    const pedido = await this.pedidoRepository.findOne({
      where: {
        codigoPedido: createDocumentoDto.codigoPedido,
      },
    });

    if (!pedido) {
      throw new NotFoundException(
        'Pedido não encontrado',
      );
    }

    const documentoExistente =
      await this.documentoRepository.findOne({

        where: {

          codigoDocumento:
            createDocumentoDto.codigoDocumento,

          codigoPedido:
            createDocumentoDto.codigoPedido,
        },
      });

    if (documentoExistente) {
      throw new BadRequestException(
        'Documento já cadastrado para este pedido',
      );
    }

    const documento = this.documentoRepository.create({

      ...createDocumentoDto,

      integrado: false,

      vinculado: pedido.integrado,


    });

    return this.documentoRepository.save(documento);
  }

  async findByPedido(
    codigoPedido: number,
  ) {

    return this.documentoRepository.find({
      where: {
        codigoPedido,
      },
    });
  }

  async findAll() {
    return this.documentoRepository.find();
  }
}