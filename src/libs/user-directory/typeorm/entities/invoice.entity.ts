import { IEntity } from './interfaces/entity.interface';
import { PrimaryGeneratedColumn, ManyToOne, Column, Entity } from 'typeorm';
import { User } from './user.entity';
import { PaymentPlan } from './payment-plan.entity';
import { IInvoice } from '../../interfaces/models/invoice.interface';

@Entity()
export class Invoice implements IEntity, IInvoice {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(type => User, user => user.invoices)
  user: User;
  @ManyToOne(type => PaymentPlan, pp => pp.invoices)
  plan: PaymentPlan;
  @Column()
  date?: Date;
  @Column()
  isPaid?: boolean;
  @Column()
  authority: string;
  @Column()
  description?: string;
}
