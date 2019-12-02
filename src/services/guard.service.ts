import { injectable } from 'inversify';
import{ GuardService } from '../libs/guard';
import{ RoleTypeormRepository } from '../libs/guard/typeorm';

@injectable()
export class TypeOrmGuardService extends GuardService {
constructor() {
    super(new RoleTypeormRepository());
}
}