import { ICRUDService } from './crud-service.interface';
import { IInvoice } from '../../models';

export interface IInvoiceService extends ICRUDService<IInvoice> {}
