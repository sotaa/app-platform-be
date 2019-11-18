import { inject, injectable } from 'inversify';
import { AuthService as IdentityAuthService } from '../libs/identity/typeorm';
import { IIdentityConfig } from '../libs/identity/interfaces';
import { TYPES } from '../ioc/types';

@injectable()
export class AuthService extends IdentityAuthService {
  constructor(@inject(TYPES.IIdentityConfig) config: IIdentityConfig) {
    super(config);
  }
}
