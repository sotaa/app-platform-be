import { CRUDService } from './crud.service';
import { Application } from '../entities';
import { getRepository } from 'typeorm';

export class ApplicationService extends CRUDService<Application> {
    constructor() {
        super(getRepository(Application));
    }
}
