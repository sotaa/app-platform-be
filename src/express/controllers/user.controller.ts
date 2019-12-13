import { Request as IRequest} from 'express';
import { IUser, IUserService } from '../../libs/user-directory/interfaces';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../ioc/types';
import { IIdentityUser } from '../../libs/identity/interfaces';

@injectable()
export class UserController {
  constructor(@inject(TYPES.IUserService) private userService: IUserService) {
  }
  
  // @Get()
  // async list(@Query() filter?: any): Promise<IUser[]> {
  //   return this.userService.find(filter);
  // }

  // @Get('{id}')
  // async find(id: number): Promise<IUser> {
  //   return this.userService.findById(id);
  // }
  
  create(user: IUser, req: IRequest): Promise<IUser> {
    const idUser = (req.body as any).user as IIdentityUser;
    user.id = idUser.id.toString();
    return this.userService.create(user);
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