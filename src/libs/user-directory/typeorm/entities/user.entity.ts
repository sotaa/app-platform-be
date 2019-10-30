import { Invoice } from './invoice.entity';
import { Column, Index, OneToMany, ChildEntity, PrimaryColumn, PrimaryGeneratedColumn, Entity } from 'typeorm';
import { IUser } from '../../interfaces/models/user.interface';
import {IsEmail, } from 'class-validator';
import { IEntity } from './interfaces/entity.interface';

@Entity()
export class User implements IUser , IEntity{
  @PrimaryColumn({default: 'uuid_generate_v4()', unique: true})
  id: string;
  @Column({nullable: true})
  firstName: string; 
  @Column({nullable: true})
  lastName: string;
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
