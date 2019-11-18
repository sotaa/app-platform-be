import { getManager } from 'typeorm';
import { UserService as US } from '../../classes/services/user.service';
export class UserService extends US {
  constructor() {
      super(getManager());
  }
}
