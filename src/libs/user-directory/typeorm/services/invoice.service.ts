import { CRUDService } from './crud.service';
import { Invoice } from '../entities';
import { getRepository } from 'typeorm';
import { IInvoiceService } from '../../interfaces';

export class InvoiceService extends CRUDService<Invoice> implements IInvoiceService {
    constructor() {
        super(getRepository(Invoice));
    }
}
