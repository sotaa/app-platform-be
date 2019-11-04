import { IInvoiceService, IUser, IPaymentPlan, IInvoice } from '../../interfaces';
import { IInvoiceSaver } from '../../interfaces/repositories/invoice.repository';
import { Invoice } from '.';

export class InvoiceService implements IInvoiceService {
  constructor(protected invoiceRepository: IInvoiceSaver) {}

  createInvoice(user: IUser, plan: IPaymentPlan): Promise<IInvoice> {
    const invoice = new Invoice(user, plan);
    return this.invoiceRepository.save(invoice);
  }
}
