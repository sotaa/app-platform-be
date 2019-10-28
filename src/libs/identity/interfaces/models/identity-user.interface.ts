import { IToken } from './token.interface';
import { IEntity } from '../../../user-directory/typeorm/entities/interfaces/entity.interface';

export interface IIdentityUser extends IEntity {
  username: string;
  password: string;
  tokens: IToken[];
}
