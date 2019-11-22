import 'mocha';

import { expect , should} from 'chai';
import { GuardService } from './guard.service';

let guardService: GuardService;
const user = { roles: [{ title: 'role1', permissions: ['pr1', 'pr2', 'p3'] }] };
describe('Guard Service', () => {
  it('Should Create', () => {
    guardService = new GuardService();
    expect(guardService).not.undefined;
  });

  it('Should grant the access', () => {
    const user = { roles: [{ title: 'role1', permissions: ['pr1', 'pr2', 'pr3'] }] };

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
