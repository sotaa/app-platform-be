import { Controller, Route, Post, Get, Path, Body, BodyProp } from 'tsoa';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../libs/user-directory';
import {
  IAuthService,
  IAuthResult,
  IAuthData,
  ITokenPair
} from '../../libs/identity/interfaces';
import { BAD_REQUEST } from 'http-status-codes';
@Route('auth')
@injectable()
export class AuthController extends Controller {
  constructor(@inject(TYPES.IAuthService) private authService: IAuthService) {
    super();
  }

  @Post('register')
  public async register(@Body() authData: IAuthData): Promise<IAuthResult> {
    try {
     const result = await this.authService.register(authData);
      return result;
    } catch (e) {
      this.setStatus(BAD_REQUEST);
      return e;
    }
  }

  @Post('login')
  public async login(@Body() authData: IAuthData): Promise<IAuthResult> {
    return await this.authService.login(authData);
  }

  @Post('reset-password')
  public async resetPassword(@BodyProp() username: string): Promise<boolean> {
    return this.authService.resetPassword(username);
  }

  @Get('token/{refreshToken}')
  public async renewToken(refreshToken: string): Promise<ITokenPair> {
    return this.authService.renewToken(refreshToken);
  }
}
