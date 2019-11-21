import { EntitySchema } from "typeorm";
import { IdentityUser } from "../../classes/identity-user.model";

export const IdentityUserEntity = new EntitySchema<IdentityUser>({
  name: 'identity_user',
  columns: {
    id: {
      type: Number,
      generated: 'increment',
      primary: true
    },
    password: {
      type: String,
      nullable: false
    },
    username: {
      type: String,
      nullable: false,
      unique: true
    }
  },
  relations: {
    tokens: {
      type: 'one-to-many',
      target: 'token',
      inverseSide: 'user',
      eager: false
    }
  }
});