import { CRUDService } from './crud.service';
import { Token } from '../entities';
import { getRepository } from 'typeorm';

export class TokenService extends CRUDService<Token> {
    constructor() {
        super(getRepository(Token));
    }
}
