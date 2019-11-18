import { Controller, Route, Post, Body, Request } from 'tsoa';
import { Request as IRequest} from 'express';
import { IUser, IUserService } from '../../libs/user-directory/interfaces';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../ioc/types';
import { IIdentityUser } from '../../libs/identity/interfaces';

@Route('users')
@injectable()
export class UserController extends Controller {
  constructor(@inject(TYPES.IUserService) private userService: IUserService) {
      super();
  }
  
  // @Get()
  // async list(@Query() filter?: any): Promise<IUser[]> {
  //   return this.userService.find(filter);
  // }

  // @Get('{id}')
  // async find(id: number): Promise<IUser> {
  //   return this.userService.findById(id);
  // }
  
  @Post()
  async create(@Body() user: IUser, @Request() req: IRequest): Promise<IUser> {
    const idUser = (req.body as any).user as IIdentityUser;
    user.id = idUser.id.toString();
    return await this.userService.create(user);
  }


  // @Put('{id}')
  // async update(id:number, @Body() user: IUser): Promise<any> {
  //   return this.userService.update(id, user);
  // }
  
  // @Delete('{id}')
  //  async delete(id: number): Promise<any> {
  //    return this.userService.delete(id);
  //  }
}