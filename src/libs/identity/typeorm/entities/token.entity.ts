import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { IToken, TokenType } from '../../interfaces/models/token.interface';
import { IIdentityUser } from '../../interfaces/models/identity-user.interface';
import { IdentityUser } from './identity-user.entity';
import { IEntity } from '../interfaces';

@Entity()
export class Token implements IEntity, IToken {
  @PrimaryGeneratedColumn()
  id?: string;
  @Column()
  userId: number;
  @ManyToOne(type => IdentityUser, user => user.tokens , {nullable: false})
  user: IIdentityUser;
  @Column()
  type: TokenType;
  @Column()
  value: string;
}
