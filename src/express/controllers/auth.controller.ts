import { IGuardService } from './../../libs/guard/interfaces/guard.service.interface';
import { injectable, inject } from 'inversify';
import { IUserService, User } from '../../libs/user-directory';
import { IAuthService, IAuthResult, IAuthData, ITokenPair } from '../../libs/identity/interfaces';
import { TYPES } from '../../ioc/types';
import { DefaultRole } from '../../config/default-role';

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.IAuthService) private authService: IAuthService,
    @inject(TYPES.IUserService) private userService: IUserService,
    @inject(TYPES.IGuardService) private gaurdService: IGuardService
  ) {}

  public async register(authData: IAuthData): Promise<IAuthResult> {
    let authResult = await this.authService.register(authData);

    let user = new User(authData.username, authResult.user.id);

    user.role = await this.gaurdService.findRoleByTitle(DefaultRole);

    await this.userService.create(user);

    authResult = await this.authService.addCustomPayloadToAuthResult(authResult, {
      role: user.role,
      expireDate: user.expireDate,
    });
    authResult.user.role = user.role;
    authResult.user.expireDate = user.expireDate;
    return authResult;
  }

  public async login(authData: IAuthData): Promise<IAuthResult> {
    let authResult = await this.authService.login(authData);
    const user = await this.userService.findById(authResult.user.id);
    authResult = await this.authService.addCustomPayloadToAuthResult(authResult, {
      role: user.role,
      expireDate: user.expireDate,
    });
    authResult.user.role = user.role;
    authResult.user.expireDate = user.expireDate;
    return authResult;
  }

  public async resetPassword(username: string): Promise<boolean> {
    return this.authService.resetPassword(username);
  }

  public async renewToken(refreshToken: string): Promise<ITokenPair> {
    return this.authService.renewToken(refreshToken);
  }
}
