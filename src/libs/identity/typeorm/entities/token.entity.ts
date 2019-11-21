import { EntitySchema } from "typeorm";
import { Token } from "../../classes/tokens.model";
import { TokenType } from "../../interfaces";

export const TokenEntity = new EntitySchema<Token>({
  name: 'token',
  columns: {
    id: {
      type: Number,
      generated: 'increment',
      primary: true
    },
    type: {
      type: 'enum',
      enum: TokenType,
      nullable: false,
    },
    value: {
      type: String,
      nullable: false
    }
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'identity_user',
      inverseSide: 'tokens'
    }
  }
})