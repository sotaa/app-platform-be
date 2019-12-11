import { IApplication, IApplicationService } from '../../libs/user-directory';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../ioc/types';

@injectable()
export class ApplicationController {
  constructor(@inject(TYPES.IApplicationService) private applicationService: IApplicationService) {}
  
  async list(filter?: any): Promise<IApplication[]> {
    return this.applicationService.find(filter);
  }

  async find(id: number): Promise<IApplication> {
    return this.applicationService.findById(id);
  }
  
  async create(plan: IApplication): Promise<IApplication> {
    return await this.applicationService.create(plan);
  }

  async update(id:number,plan: IApplication): Promise<any> {
    return this.applicationService.update(id, plan);
  }
  
   async delete(id: number): Promise<any> {
     return this.applicationService.delete(id);
   }
}
