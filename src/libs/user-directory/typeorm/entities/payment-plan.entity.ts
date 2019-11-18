import { IEntity } from './interfaces/entity.interface';
import { Invoice } from '../../classes/models/invoice.model';
import { OneToMany, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { IPaymentPlan } from '../../interfaces/models/payment-plan.interface';

@Entity({name: 'plan'})
export class PaymentPlan implements IEntity, IPaymentPlan {
  @PrimaryGeneratedColumn()
  id?: number;
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
