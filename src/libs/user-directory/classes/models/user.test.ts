import 'mocha';
import * as chai from 'chai';

import { User } from "./user.model";
import { isSameDay , addDays} from 'date-and-time'

describe('User Model', () => {
    it('Should upgrade', () => {
        const user = new User('email');
        chai.expect(user.expireDate).be.undefined;
        user.upgrade(10);
        chai.expect(isSameDay(addDays(new Date(), 10) , user.expireDate)).be.true;
        
    })
});