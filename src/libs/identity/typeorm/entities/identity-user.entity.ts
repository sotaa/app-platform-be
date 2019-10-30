import { IIdentityUser, IToken } from '../../interfaces';
import { Entity, Column, OneToMany, TableInheritance, PrimaryGeneratedColumn, Index } from 'typeorm';
import { Token } from './token.entity';
import { IEntity } from '../interfaces';

@Entity()
@TableInheritance({column: {type: 'nvarchar', name: 'type'}})
export class IdentityUser implements IEntity, IIdentityUser {
  @PrimaryGeneratedColumn()
  id?: string;
  @Column()
  @Index({unique: true})
  username: string;
  @Column()
  password: string;
  @OneToMany(type => Token, token => token.user, {cascade: ['insert', 'remove', 'update']})
  tokens: IToken[];
}
