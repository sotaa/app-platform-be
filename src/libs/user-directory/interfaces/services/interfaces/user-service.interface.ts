import { ICRUDService } from './crud-service.interface';
import { IUser } from '../../models';

export interface IUserService extends ICRUDService<IUser> {
}
