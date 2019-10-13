import { IEntity } from './interfaces/entity.interface';
import { Invoice } from './invoice.entity';
import { PrimaryGeneratedColumn, Column, Index, ManyToOne, Entity, OneToMany } from 'typeorm';
import { Token } from './token.entity';
import { IUser } from '../../interfaces/models/user.interface';

@Entity()
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
  @OneToMany(type => Token, token => token.user)
  tokens: Token[];
  @Column()
  expireDate?: Date;
  @Column()
  registerDate: Date;
  @OneToMany(type => Invoice, invoice => invoice.user)
  invoices: Invoice[];
}
