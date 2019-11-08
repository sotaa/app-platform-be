import { Invoice } from './invoice.entity';
import { Column, Index, OneToMany, ChildEntity, PrimaryColumn, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { IUserDTO } from '../../interfaces/models/user.interface';
import { IEntity } from './interfaces/entity.interface';
import { IInvoice } from '../..';

@Entity()
export class User implements IUserDTO, IEntity {
  @PrimaryColumn({ default: 'uuid_generate_v4()', unique: true })
  id: string;
  @Column({ unique: true, nullable: false })
  @Index()
  email: string;
  @Column({ nullable: true })
  firstName: string;
  @Column({ nullable: true })
  lastName: string;
  @Index()
  @Column({ nullable: true })
  mobile: string;
  @Column({ nullable: true })
  expireDate?: Date;
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  readonly registerDate: Date;
  @OneToMany(() => Invoice, invoice => invoice.user)
  invoices: IInvoice[];
}
