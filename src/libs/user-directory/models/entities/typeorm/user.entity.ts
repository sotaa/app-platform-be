import { IEntity } from './interfaces/entity.interface';
import { IUser } from '../../interfaces/user.interface';
import { IToken } from '../../interfaces/token.interface';
import { Invoice } from './invoice.entity';
import { PrimaryGeneratedColumn, Column, Index, ManyToOne } from 'typeorm';
import { Token } from './token.entity';

export class User implements IEntity, IUser {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Index()
  @Column()
  email: string;
  @Index()
  @Column()
  password: string;
  @Index()
  @Column()
  mobile: string;
  @ManyToOne(type => Token, token => token.user)
  tokens: IToken[];
  @Column()
  expireDate?: Date;
  @Column()
  registerDate: Date;
  @ManyToOne(type => Invoice, invoice => invoice.user)
  invoices: Invoice[];
}
