import { CRUDService } from './crud.service';
import { User } from '../entities';

export class UserService extends CRUDService<User> {}
