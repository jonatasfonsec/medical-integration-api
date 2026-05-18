import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('exames')
export class Exame {

  @PrimaryColumn()
  accessionNumber: string;

  @Column()
  codigoPedido: number;

  @Column()
  nomePaciente: string;

  @Column()
  modalidade: string;

  @Column()
  status: string;
}