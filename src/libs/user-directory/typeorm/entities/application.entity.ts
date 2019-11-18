import { EntitySchema } from 'typeorm';
import { Application } from '../../classes/models';

export const ApplicationEntity = new EntitySchema<Application>({
  name: 'application',
  columns: {
    id: {
      type: Number,
      generated: 'increment',
      primary: true
    },
    isActive: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      nullable: false
    },
    url: { type: String, nullable: false }
  }
});
