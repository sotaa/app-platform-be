import {AuthService as AS} from './auth.service';
import { IIdentityConfig } from '../../interfaces';
import { getManager } from 'typeorm';
import { TokenManager } from '../../helpers/token.manager';

export class AuthService extends AS {
    constructor(config: IIdentityConfig) {
        super(getManager(), new TokenManager(), config);
    }
}