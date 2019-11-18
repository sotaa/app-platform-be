import { IEntity } from '../../typeorm/entities/interfaces/entity.interface';
import { IApplication } from '../../interfaces/models/application.interface';

export class Application implements IEntity, IApplication {
  id?: number;
  name: string;
  url: string;
  isActive: boolean;
}
