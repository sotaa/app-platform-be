import { CRUDService } from './crud.service';
import { Invoice } from '../entities';
import { getRepository } from 'typeorm';

export class InvoiceService extends CRUDService<Invoice> {
    constructor() {
        super(getRepository(Invoice));
    }
}
