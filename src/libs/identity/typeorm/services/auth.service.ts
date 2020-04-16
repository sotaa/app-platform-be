import { IAuthService, IAuthData, IAuthResult, ITokenPair, IIdentityConfig, IIdentityUser } from '../../interfaces';
import { EntityManager } from 'typeorm';
import { AuthResult } from '../../classes/auth-result.model';
import { compare, hash } from '../../helpers/crypto';
import { WrongPasswordError, UserNameNotFoundError, InvalidTokenError } from '../../classes/errors/identity-errors';
import { ITokenManager } from '../../helpers/token.manager';
import { AuthDataValidator, RegexValidator, IdentityUser, Token, AccessToken, RefreshToken } from '../..';

export class AuthService implements IAuthService {
  constructor(
    protected manager: EntityManager,
    protected tokenManager: ITokenManager,
    protected config: IIdentityConfig
  ) {}

  async register(authData: IAuthData): Promise<IAuthResult> {
    const validator = new AuthDataValidator(this.config.validations.authData, new RegexValidator(), (username) =>
      this.manager.findOne<IdentityUser>('identity_user', { username })
    );
    const validationResult = await validator.validate(authData);

    if (!validationResult.isValid) {
      throw validationResult.errors;
    }

    const hashedPassword = await hash(authData.password);
    let user = new IdentityUser(authData.username, hashedPassword);
    let result;

    await this.manager.transaction(async (transactionEntityManager) => {
      await this.manager.save('identity_user', user);
      result = this.generateAuthResult(user);
      await this.saveUserTokens(user, result, transactionEntityManager);
    });
    return result;
  }

  async login(authData: IAuthData): Promise<IAuthResult> {
    let _user = await this.manager.findOne<IdentityUser>('identity_user', {
      username: authData.username,
    });
    if (!_user) {
      throw new UserNameNotFoundError();
    }

    const passwordsAreMatch = await compare(authData.password, _user.password);

    if (!passwordsAreMatch) {
      throw new WrongPasswordError();
    }

    const result = this.generateAuthResult(_user);

    this.manager.transaction(async (transactionManager) => {
      await this.saveUserTokens(_user, result, transactionManager);
    });

    return result;
  }

  resetPassword(username: string): Promise<boolean> {
    // TODO: need to be implemented.
    throw new Error('Method not implemented.');
  }

  async renewToken(refreshToken: string): Promise<ITokenPair> {
    let data: any;
    try {
      data = this.tokenManager.extract(refreshToken, this.config.secretKey);
    } catch (e) {
      throw new InvalidTokenError();
    }
    data.randomSalt = new Date().getTime();
    const result = this.generateTokenPair(data);

    this.manager.transaction(async (transactionManager) => {
      await this.saveUserTokens(data.user, result, transactionManager);
    });
    return result;
  }

  async addCustomPayloadToAuthResult(authResult: IAuthResult, payload: any) {
    const newAuthResult = { ...authResult, ...this.generateTokenPair({ ...authResult, ...payload }) };
    this.saveUserTokens(authResult.user, { token: newAuthResult.token, refreshToken: newAuthResult.refreshToken });
    return newAuthResult;
  }

  private async saveUserTokens(_user: IIdentityUser, result: ITokenPair, manager = this.manager) {
    const accessToken = new AccessToken(result.token, _user);
    const refreshToken = new RefreshToken(result.refreshToken, _user);

    await manager.save('token', accessToken);
    await manager.save('token', refreshToken);
  }

  private generateAuthResult(_user: IIdentityUser) {
    const result = new AuthResult();

    /** This user object will be inserted to token and result as user data */
    const user = { id: _user.id, username: _user.username };

    result.expiresIn = this.config.tokenLife;
    result.token = this.tokenManager.generate({ info: user }, this.config.secretKey, this.config.tokenLife);
    result.refreshToken = this.tokenManager.generate({ user }, this.config.secretKey);
    result.user = user;
    return result;
  }

  private generateTokenPair(payload: any): ITokenPair {
    return {
      token: this.tokenManager.generate(payload, this.config.secretKey, this.config.tokenLife),
      refreshToken: this.tokenManager.generate(payload, this.config.secretKey),
    };
  }
}
