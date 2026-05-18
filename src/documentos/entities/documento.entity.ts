import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('documentos')
export class Documento {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigoDocumento: number;

  @Column()
  codigoPedido: number;

  @Column()
  nomeDocumento: string;

  @Column('text')
  documento: string;

  @Column({ default: false })
  integrado: boolean;

  @Column({ default: false })
  vinculado: boolean;
}