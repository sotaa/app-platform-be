import { EntitySchema } from 'typeorm';
import { User } from '../../classes/models';

export const UserEntity = new EntitySchema<User>({
  name: 'user',
  columns: {
    id: {
      type: String,
      primary: true,
      default: 'uuid_generate_v4()',
      unique: true
    },
    email: {
      type: String,
      nullable: false
    },
    expireDate: {
      type: 'date'
    },
    firstName: {
      type: String,
      nullable: true
    },
    lastName: {
      type: String,
      nullable: true
    },
    mobile: {
      type: String,
      nullable: true
    },
    registerDate: {
      type: Date,
      default: () => 'CURRENT_TIMESTAMP'
    },
    gender: {
      type: String,
      default: 'MALE'
    }
  },
  relations: {
    invoices: {
      type: 'one-to-many',
      target: 'invoice',
      inverseSide: 'user'
    },
    role: {
      type: 'many-to-one',
      target: 'role'
    }
  }
});
