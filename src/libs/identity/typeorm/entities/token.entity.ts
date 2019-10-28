import { IEntity } from '../../../user-directory/typeorm/entities/interfaces/entity.interface';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { IToken, TokenType } from '../../interfaces/models/token.interface';
import { IIdentityUser } from '../../interfaces/models/identity-user.interface';
import { IdentityUser } from './identity-user.entity';

@Entity()
export class Token implements IEntity, IToken {
  @PrimaryGeneratedColumn()
  id?: number;
  @ManyToOne(type => IdentityUser, user => user.tokens)
  user: IdentityUser;
  @Column()
  type: TokenType;
  @Column()
  value: string;
}
