import { Controller, Route, Post, Get, Path, Body, BodyProp } from 'tsoa';
import { injectable, inject } from 'inversify';
import { TYPES, IUserService } from '../../libs/user-directory';
import { IAuthService, IAuthResult, IAuthData, ITokenPair } from '../../libs/identity/interfaces';
import { BAD_REQUEST } from 'http-status-codes';
import { User } from '../../libs/user-directory/classes/models/user.model';
@Route('auth')
@injectable()
export class AuthController extends Controller {
  constructor(@inject(TYPES.IAuthService) private authService: IAuthService, private userService: IUserService) {
    super();
  }

  @Post('register')
  public async register(@Body() authData: IAuthData): Promise<IAuthResult> {
    try {
      // TODO: It should create both users in a single transaction.
      /**
       * Currently I don't know how to do it to make it available 
       * to do to run something like saveChanges() in EntityFramework.
       * But I will find out.
       */
      const authResult = await this.authService.register(authData);
      await this.userService.create(new User(authData.username, authResult.user.id));
      return authResult;
    } catch (e) {
      this.setStatus(BAD_REQUEST);
      return e;
    }
  }

  @Post('login')
  public async login(@Body() authData: IAuthData): Promise<IAuthResult> {
    try {
      return await this.authService.login(authData);
    } catch (e) {
      this.setStatus(BAD_REQUEST);
      return e;
    }
  }

  @Post('reset-password')
  public async resetPassword(@BodyProp() username: string): Promise<boolean> {
    return this.authService.resetPassword(username);
  }

  @Get('token/{refreshToken}')
  public async renewToken(refreshToken: string): Promise<ITokenPair> {
    try {
      return await this.authService.renewToken(refreshToken);
    } catch (e) {
      this.setStatus(BAD_REQUEST);
      return e;
    }
  }
}
