import { EntitySchema } from 'typeorm';
import { PaymentPlan } from '../../lib/models/payment-plan.model';

export const PaymentPlanEntity = new EntitySchema<PaymentPlan>({
  name: 'plan',
  columns: {
    id: {
      type: Number,
      generated: 'increment',
      primary: true
    },
    name: {
      type: String,
      nullable: false
    },
    price: {
      type: Number,
      nullable: false
    },
    isActive: {
      type: Boolean,
      default: true,
      nullable: false
    },
    dateRange: {
      type: Number,
      default: 0,
      nullable: false
    },
    description: {
      type: String
    }
  },
  relations: {
    invoices: {
      type: 'one-to-many',
      target: 'invoice',
      lazy: true
    }
  }
});
