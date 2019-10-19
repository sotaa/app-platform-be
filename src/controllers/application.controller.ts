import { Controller, Route, Get, Query , Post, Body, Delete, Put } from 'tsoa';
import { IApplication, IApplicationService, TYPES } from '../libs/user-directory/interfaces';
import { inject, injectable } from 'inversify';

@Route('applications')
@injectable()
export class ApplicationController extends Controller {
  constructor(@inject(TYPES.IApplicationService) private applicationService: IApplicationService) {
      super();
  }
  
  @Get()
  async list(@Query() filter?: any): Promise<IApplication[]> {
    return this.applicationService.find(filter);
  }

  @Get('{id}')
  async find(id: number): Promise<IApplication> {
    return this.applicationService.findById(id);
  }
  
  @Post()
  async create(@Body() plan: IApplication): Promise<IApplication> {
    return await this.applicationService.create(plan);
  }

  @Put('{id}')
  async update(id:number, @Body() plan: IApplication): Promise<any> {
    return this.applicationService.update(id, plan);
  }
  
  @Delete('{id}')
   async delete(id: number): Promise<any> {
     return this.applicationService.delete(id);
   }
}
