import { ICRUDService } from './crud-service.interface';
import { IUser } from '../../models';
import { IUserCreateViewModel } from '../../models/user-create.viewmodel';

export interface IUserService extends ICRUDService<IUser> {
}
