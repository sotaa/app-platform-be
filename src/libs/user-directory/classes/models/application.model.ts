import { IApplication } from '../../interfaces/models/application.interface';

export class Application implements IApplication {
  id?: number;
  name: string;
  url: string;
  isActive: boolean;
}
