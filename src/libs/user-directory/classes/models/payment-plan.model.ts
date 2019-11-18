import { IEntity } from '../../typeorm/entities/interfaces/entity.interface';
import { Invoice } from './invoice.model';
import { IPaymentPlan } from '../../interfaces/models/payment-plan.interface';

export class PaymentPlan implements IEntity, IPaymentPlan {
  id?: number;
  name: string;
  price: number;
  dateRange: number;
  isActive: boolean;
  description?: string;
  invoices: Invoice[];
}
