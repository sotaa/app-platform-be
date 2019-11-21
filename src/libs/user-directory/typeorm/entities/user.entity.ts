import { EntitySchema } from 'typeorm';
import { User } from '../../classes/models';

export const UserEntity = new EntitySchema<User>({
  name: 'user',
  columns: {
    id: {
      type: String,
      primary: true,
      default: 'uuid_generate_v4()' ,
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
        type: String
    },
    lastName: {
        type: String
    },
    mobile: {
        type: String
    },
    registerDate: {
        type: Date,
        default: () => 'CURRENT_TIMESTAMP'
    },
    sex: {
        type: String,
    }
  },
  relations: {
      invoices: {
          type: 'one-to-many',
          target: 'invoice',
          inverseSide: 'user'
      }
  }
});
