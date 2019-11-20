import { getRepository } from 'typeorm';
import { UserService as US } from '../../classes/services/user.service';
import { UserEntity } from '../entities';
export class UserService extends US {
  constructor() {
      super(getRepository(UserEntity));
  }
}
