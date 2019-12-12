import { injectable, inject } from 'inversify';
import { IUserService, User } from '../../libs/user-directory';
import { IAuthService, IAuthResult, IAuthData, ITokenPair } from '../../libs/identity/interfaces';
import { TYPES } from '../../ioc/types';

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.IAuthService) private authService: IAuthService,
    @inject(TYPES.IUserService) private userService: IUserService
  ) {}

  public async register(authData: IAuthData): Promise<IAuthResult> {
    let authResult = await this.authService.register(authData);
    const user = await this.userService.create(new User(authData.username, authResult.user.id));
    authResult = await this.authService.addCustomPayloadToAuthResult(authResult, { role: user.role });
    authResult.user.role = user.role;
    return authResult;
  }

  public async login(authData: IAuthData): Promise<IAuthResult> {
    let authResult = await this.authService.login(authData);
    const user = await this.userService.findById(authResult.user.id);
    authResult = await this.authService.addCustomPayloadToAuthResult(authResult, { role: user.role });
    authResult.user.role = user.role;
    return authResult;
  }

  public async resetPassword(username: string): Promise<boolean> {
    return this.authService.resetPassword(username);
  }

  public async renewToken(refreshToken: string): Promise<ITokenPair> {
    return this.authService.renewToken(refreshToken);
  }
}
