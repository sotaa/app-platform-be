import { sign, verify } from 'jsonwebtoken';

export interface ITokenGenerator {
  generate(payload: any, secretKey: string, expiresIn?: number): string;
}

export interface ITokenExtractor {
  extract(token: string, secretKey: string): any;
}

export interface ITokenManager extends ITokenExtractor, ITokenGenerator {}

export class TokenManager implements ITokenManager {
  extract(token: string, secretKey: string) {
    return verify(token, secretKey);
  }

  generate(payload: any, secretKey: string, expiresIn?: number): string {
    if (!expiresIn) {
      return sign(payload, secretKey);
    }

    return sign(payload, secretKey, {expiresIn});
  }
}
