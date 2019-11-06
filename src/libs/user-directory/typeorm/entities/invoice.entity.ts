import { IEntity } from './interfaces/entity.interface';
import { PrimaryGeneratedColumn, ManyToOne, Column, Entity } from 'typeorm';
import { User } from './user.entity';
import { PaymentPlan } from './payment-plan.entity';
import { IInvoice } from '../../interfaces/models/invoice.interface';
import { PaymentStatus } from '../..';

@Entity()
export class Invoice implements IEntity, IInvoice {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  payPrice: number;
  @Column({default: () => 'CURRENT_TIMESTAMP'})
  createDate?: Date;
  @Column({type: 'enum' , enum: PaymentStatus})
  paymentStatus?: PaymentStatus;
  @ManyToOne(type => User, user => user.invoices)
  user: User;
  @ManyToOne(type => PaymentPlan, pp => pp.invoices)
  plan: PaymentPlan;
  @Column()
  description?: string;
}
