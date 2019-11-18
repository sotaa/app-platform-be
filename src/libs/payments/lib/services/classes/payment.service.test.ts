import 'mocha';
import { PaymentService } from './payment.service';
import { expect } from 'chai';

let paymentService: PaymentService;

class MockEntityManager  {
    findOne<T>(params: any) {
        return {};
    }

    transaction(func: () => Promise<any>) {
       return func();
    }

    save(data: any) {
        return Promise.resolve(data);
    }
}

describe('Payment Service', () => {
    it('Should create', () => {
        paymentService = new PaymentService(new MockEntityManager() as any)
        expect(paymentService).not.undefined;
    });
})
