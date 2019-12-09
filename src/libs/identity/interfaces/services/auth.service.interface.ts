import { IAuthData } from '../models/auth-data.interface';
import { IAuthResult } from '../models/auth-result.interface';
import { ITokenPair } from '../models';

export interface IAuthService {
  /**
   * Register new user.
   * @param user user authentication data for registration.
   */
  register(user: IAuthData): IAuthResult | Promise<IAuthResult>;
  /**
   * Login as existing user.
   * @param user user authentication data.
   */
  login(user: IAuthData): IAuthResult | Promise<IAuthResult>;
  /**
   *  reset password using email method.
   * @param username
   */
  resetPassword(username: string): boolean | Promise<boolean>;
  /**
   * Regenerates new valid token for authorization purposes.
   * @param refreshToken
   */
  renewToken(refreshToken: string): ITokenPair | Promise<ITokenPair>;

  addCustomPayloadToAuthResult(authResult: IAuthResult, payload: any): Promise<IAuthResult>;
}