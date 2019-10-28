import { IAuthService, IAuthData, IAuthResult, TokenType, IToken, ITokenPair } from '../../interfaces';
import { EntityManager } from 'typeorm';
import { AuthResult } from '../../classes/auth-result.model';
import { IIdentityConfig } from '../../interfaces/models/config.interface';
import { compare, hash } from '../../helpers/crypto';
import { WrongPasswordError, UserNameNotFoundError } from '../../classes/errors/identity-errors';
import { ITokenManager } from '../../helpers/token.manager';
import { IdentityUser, Token } from '../entities';
import { RefreshToken, AccessToken } from '../../classes/tokens';

export class AuthService implements IAuthService {
  constructor(
    protected manager: EntityManager,
    protected tokenManager: ITokenManager,
    protected config: IIdentityConfig
  ) {}

  async register(authData: IAuthData): Promise<IAuthResult> {
    const hashedPassword = await hash(authData.password);
    let user = this.manager.create(IdentityUser, {
      username: authData.username,
      password: hashedPassword
    });

    let result;

    await this.manager.transaction(async transactionEntityManager => {
      await this.manager.save(user);
      result = this.generateAuthResult(user);
      await this.saveUserTokens(transactionEntityManager, user, result);
    });
    return result;
  }

  async login(authData: IAuthData): Promise<IAuthResult> {
    let _user = await this.manager.findOne(IdentityUser, {
      username: authData.username
    });
    if (!_user) {
      throw new UserNameNotFoundError();
    }

    const passwordsAreMatch = await compare(authData.password, _user.password);

    if (!passwordsAreMatch) {
      throw new WrongPasswordError();
    }

    const result = this.generateAuthResult(_user);
    this.manager.transaction(async transactionManager => {
      await this.saveUserTokens(transactionManager, _user, result);
    });

    return result;
  }

  resetPassword(username: string): Promise<boolean> {
    // TODO: need to be implemented.
    throw new Error('Method not implemented.');
  }

  renewToken(refreshToken: string): ITokenPair {
    const data = this.tokenManager.extract(refreshToken, this.config.secretKey);
    const result = {
      token: this.tokenManager.generate(data, this.config.secretKey, this.config.tokenLife),
      refreshToken: this.tokenManager.generate(data, this.config.secretKey)
    };

    this.saveUserTokens(this.manager, data.user, result);
    return result;
  }

  private async saveUserTokens(manager: EntityManager, _user: IdentityUser, result: ITokenPair) {
    const accessToken = manager.create(Token, new AccessToken(result.token, _user));
    const refreshToken = manager.create(Token, new RefreshToken(result.refreshToken, _user));

    await manager.save(accessToken as Token);
    await manager.save(refreshToken as Token);
  }

  private generateAuthResult(_user: IdentityUser) {
    const result = new AuthResult();
    result.expiresIn = this.config.tokenLife;
    result.token = this.tokenManager.generate(
      { id: _user.id, username: _user.username },
      this.config.secretKey,
      this.config.tokenLife
    );
    result.refreshToken = this.tokenManager.generate({ id: _user.id, username: _user.username }, this.config.secretKey);
    result.user = { id: _user.id, username: _user.username };
    return result;
  }
}
