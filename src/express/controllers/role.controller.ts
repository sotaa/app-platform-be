import { Controller, Request, Get, Route, Put, Body, Post, Delete } from 'tsoa';
import { IGuardService, IGuardUser, IRole } from '../../libs/guard';
import { Request as IRequest } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../ioc';

@injectable()
@Route('roles')
export class RoleController extends Controller {
  constructor(@inject(TYPES.IGuardService) protected guardService: IGuardService) {
    super();
  }

  @Get()
  fetch(@Request() req: IRequest): Promise<IRole[]> {
    const user = req.body['user'] as IGuardUser;
    return this.guardService.findRolesByParentTitle(user.role.title);
  }

  @Put('{title}')
  update(title: string, @Body() role: IRole): Promise<IRole> {
    return this.guardService.updateRole(title, role);
  }

  @Post()
  create(@Body() role: IRole): Promise<IRole> {
    return this.guardService.createRole(role);
  }

  @Delete('{title}')
  delete(title: string): Promise<any> {
    return this.guardService.deleteRole(title);
  }
}
