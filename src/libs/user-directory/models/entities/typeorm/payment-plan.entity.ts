import { IEntity } from './interfaces/entity.interface';
import { IPaymentPlan } from '../../interfaces/payment-plan.interface';
import { Invoice } from './invoice.entity';
import { OneToMany, PrimaryGeneratedColumn, Column } from 'typeorm';

export class PaymentPlan implements IEntity, IPaymentPlan {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  dateRange: number;
  @Column()
  isActive: boolean;
  @Column()
  description?: string;
  @OneToMany(type => Invoice, invoice => invoice.plan)
  invoices: Invoice[];
}
