import { CRUDService } from './crud.service';
import { User } from '../entities';
import { getRepository } from 'typeorm';

export class UserService extends CRUDService<User> {
    constructor() {
        super(getRepository(User));
    }
}
