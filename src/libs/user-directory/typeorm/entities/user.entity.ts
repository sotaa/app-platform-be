import { Invoice } from './invoice.entity';
import { Column, Index, OneToMany, ChildEntity } from 'typeorm';
import { IUser } from '../../interfaces/models/user.interface';
import {IsEmail, } from 'class-validator';
import { IdentityUser } from '../../../identity/typeorm/entities';

@ChildEntity()
export class User extends IdentityUser implements IUser {
  @Column({nullable: true})
  firstName: string; 
  @Column({nullable: true})
  lastName: string;
  @Index()
  @Column()
  @IsEmail()
  username: string;
  @Index()
  @Column({nullable: true})
  mobile: string;
  @Column({nullable: true})
  expireDate?: Date;
  @Column({default: () => 'CURRENT_TIMESTAMP'})
  readonly registerDate: Date;
  @OneToMany(() => Invoice, invoice => invoice.user)
  invoices: Invoice[];
}
