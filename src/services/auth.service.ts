import { inject, injectable } from 'inversify';
import { AuthService as IdentityAuthService } from '../libs/identity/typeorm/services';
import { TYPES } from '../libs/user-directory';
import { IIdentityConfig } from '../libs/identity/interfaces';

@injectable()
export class AuthService extends IdentityAuthService {
  constructor(@inject(TYPES.IIdentityConfig) config: IIdentityConfig) {
    super(config);
  }
}
