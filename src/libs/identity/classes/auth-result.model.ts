import { IAuthResult } from '../interfaces';

export class AuthResult implements IAuthResult {
  user: any;
  token: string;
  refreshToken: string;
  expiresIn: number;
}
