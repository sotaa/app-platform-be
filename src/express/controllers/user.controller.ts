/* import { Controller, Route, Get, Query , Post, Body, Delete, Put } from 'tsoa';
import { IUser, IUserService, TYPES } from '../../libs/user-directory/interfaces';
import { inject, injectable } from 'inversify';

@Route('users')
@injectable()
export class UserController extends Controller {
  constructor(@inject(TYPES.IUserService) private userService: IUserService) {
      super();
  }
  
  @Get()
  async list(@Query() filter?: any): Promise<IUser[]> {
    return this.userService.find(filter);
  }

  @Get('{id}')
  async find(id: number): Promise<IUser> {
    return this.userService.findById(id);
  }
  
  @Post()
  async create(@Body() user: IUser): Promise<IUser> {
    return await this.userService.create(user);
  }


  @Put('{id}')
  async update(id:number, @Body() user: IUser): Promise<any> {
    return this.userService.update(id, user);
  }
  
  @Delete('{id}')
   async delete(id: number): Promise<any> {
     return this.userService.delete(id);
   }
}
*/