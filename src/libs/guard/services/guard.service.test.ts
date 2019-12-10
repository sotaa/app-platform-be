import 'mocha';

import { expect } from 'chai';
import { GuardService } from './guard.service';
import { IRoleRepository, FindManyOptions, FindOneOptions, FindConditions } from '../interfaces/role.repository';
import { IRole } from '..';
import { Role } from '../classes';
import { IGuardUser } from '../interfaces';

class MockRoleRepository implements IRoleRepository {
  update(filter: FindConditions<IRole>, role: IRole): Promise<any> {
    throw new Error("Method not implemented.");
  }
  delete(filter: FindConditions<IRole>): Promise<any> {
    throw new Error("Method not implemented.");
  }
  save(role: IRole): Promise<IRole> {
    return Promise.resolve(role);
  }
  find(filter?: FindManyOptions<IRole>): Promise<IRole[]> {
    return Promise.resolve([]);
  }
  findOne(filter: FindOneOptions<IRole>): Promise<IRole> {
    return Promise.resolve(new Role('mock', []));
  }
}

let guardService: GuardService;
const user: IGuardUser = { role: {users: [], title: 'role1', permissions: ['pr1', 'pr2', 'p3'] } };
describe('Guard Service', () => {
  it('Should Create', () => {
    guardService = new GuardService(new MockRoleRepository);
    expect(guardService).not.undefined;
  });

  it('Should grant the access', () => {

    let isGranted = guardService.hasPermissions(user, ['pr1', 'pr2']);
    expect(isGranted).be.true;
    isGranted = guardService.hasPermissions(user, ['pr2']);
    expect(isGranted).be.true;
    isGranted = guardService.hasPermissions(user, ['pr1', 'pr2', 'pr3']);
    expect(isGranted).be.true;
  });

  it('Should not grant the access', () => {
    let isGranted = guardService.hasPermissions(user, ['pr10', 'pr2']);
    expect(isGranted).be.false;
    isGranted = guardService.hasPermissions(user, ['pr20']);
    expect(isGranted).be.false;
    isGranted = guardService.hasPermissions(user, ['pr10', 'pr2', 'pr3']);
    expect(isGranted).be.false;
  });

  it('Should throw user required error', () => {
    expect(() => guardService.hasPermissions(null, ['rp1', 'rp2'])).to.throw('user is null or undefined.');
  });

  it('Should grant the access with empty required permission', () => {
    expect(guardService.hasPermissions(user, [])).be.true;
    expect(guardService.hasPermissions(user, null)).be.true;
  });
});
