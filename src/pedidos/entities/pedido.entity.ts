import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('pedidos')
export class Pedido {
  
  @PrimaryColumn()
  codigoPedido: number;

  @Column()
  accessionNumber: string;

  @Column()
  nomePaciente: string;

  @Column()
  dataNascimento: string;

  @Column()
  sexo: string;

  @Column()
  codUnidade: number;

  @Column({ default: false })
  integrado: boolean;


}