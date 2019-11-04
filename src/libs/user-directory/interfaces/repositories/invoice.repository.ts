import { IInvoice } from "../models";

export interface IInvoiceRepository extends IInvoiceSaver{
    
}

export interface IInvoiceSaver {
    save(invoice: IInvoice): Promise<IInvoice>;
}