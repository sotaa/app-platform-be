import { Request as IRequest } from 'express';
import { IUser, IUserService } from '../../libs/user-directory/interfaces';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../ioc/types';
import { IGuardService } from '../../libs/guard/interfaces/guard.service.interface';
import { USER_EDIT } from '../../config/permissions.const';

import { DefaultRole } from '../../config/default-role';

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.IUserService) private userService: IUserService,
    @inject(TYPES.IGuardService) private gaurdService: IGuardService
  ) {}

  getAll(filter?: any): Promise<IUser[]> {
    return this.userService.findAll(filter);
  }

  get(id: string): Promise<IUser> {
    return this.userService.findById(id);
  }

  async update(id: string, reqBody: any, user: any): Promise<any> {
    let role;
    user.role.permissions.find((f: any) => f == USER_EDIT)
      ? (reqBody.role ? (role = reqBody.role) : (role = DefaultRole),
        (reqBody.role = await this.gaurdService.findRoleByTitle(role)))
      : delete reqBody.role;
    reqBody.gender ? (reqBody.gender = reqBody.gender.toUpperCase()) : true;
    reqBody.email ? delete reqBody.email : true;

    return this.userService.update(id, reqBody);
  }

  // create(user: IUser, req: IRequest): Promise<IUser> {
  //   const idUser = (req.body as any).user as IIdentityUser;
  //   user.id = idUser.id.toString();
  //   return this.userService.create(user);
  // }

  // @Delete('{id}')
  //  async delete(id: number): Promise<any> {
  //    return this.userService.delete(id);
  //  }
}
