import {

  Injectable,

  BadRequestException,

  NotFoundException,

} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Exame } from './entities/exame.entity';

import { Pedido } from '../pedidos/entities/pedido.entity';

import { CreateExameDto } from './dto/create-exame.dto';

import { Documento } from '../documentos/entities/documento.entity';

@Injectable()
export class ExamesService {

  constructor(

    @InjectRepository(Exame)
    private exameRepository: Repository<Exame>,

    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,

    @InjectRepository(Documento)
    private documentoRepository: Repository<Documento>,

  ) { }

  async create(createExameDto: CreateExameDto) {

    const pedido = await this.pedidoRepository.findOne({

      where: {
        codigoPedido: createExameDto.codigoPedido,
      },
    });

    if (!pedido) {
      throw new NotFoundException(
        'Pedido não encontrado',
      );
    }

    const exameExistente =
      await this.exameRepository.findOne({

        where: {
          accessionNumber:
            createExameDto.accessionNumber,
        },
      });

    if (exameExistente) {
      throw new BadRequestException(
        'Exame já cadastrado',
      );
    }

    const exame = this.exameRepository.create({
      ...createExameDto,
    });

    pedido.integrado = true;

    await this.pedidoRepository.save(pedido);

    await this.documentoRepository.update(

  {
    codigoPedido: pedido.codigoPedido,
  },

  {
    vinculado: true,
  },
);

    return this.exameRepository.save(exame);
  }

  async findByAccession(
    accessionNumber: string,
  ) {

    return this.exameRepository.findOne({

      where: {
        accessionNumber,
      },
    });
  }

  async findAll() {
    return this.exameRepository.find();
  }
}