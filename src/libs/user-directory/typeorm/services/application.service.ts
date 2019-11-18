import { CRUDService } from './crud.service';
import { getRepository } from 'typeorm';
import { ApplicationEntity } from '../entities';
import { Application } from '../../classes/models';

export class ApplicationService extends CRUDService<Application> {
    constructor() {
        super(getRepository(ApplicationEntity));
    }
}
