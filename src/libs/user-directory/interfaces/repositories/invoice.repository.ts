import { IInvoice } from "../../../payments";

export interface IInvoiceRepository extends IInvoiceSaver{
    
}

export interface IInvoiceSaver {
    save(invoice: IInvoice): Promise<IInvoice>;
}