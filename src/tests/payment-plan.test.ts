import 'mocha';
import {userDirectory as UDPromise} from '..';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { Express } from 'express';

chai.use(chaiHttp);
let should = chai.should();
const expect = chai.expect;

let sample = {
  name: 'string',
  price: 0,
  dateRange: 0,
  isActive: true,
  description: 'string'
};

let id = 1;

let userDirectory: Express;

before(async () => {
  userDirectory = (await UDPromise).app;
});
describe('Payment-Plans', () => {
  describe('GET: /payment-plans', () => {
    it('should return status 200 with an empty array in body', () => {
      return chai
        .request(userDirectory)
        .get('/payment-plans')
        .then(res => {
          res.should.have.status(200);
          expect(res.body).to.instanceOf(Array);
        });
    });
  });

  describe('POST: /payment-plan', () => {
    it('should create a new payment plan', () => {
      return chai
        .request(userDirectory)
        .post('/payment-plans')
        .send(sample)
        .then(res => {
          expect(res).have.status(200);
          expect(res.body)
            .have.property('id')
            .and.be.greaterThan(0);
          expect(res.body.name).to.be.deep.equal(sample.name);
          id = res.body.id;
        });
    });
  });

  describe('GET: /payment-plans/{id}', () => {
    it('Should return object with id ' + id, () => {
      return chai
        .request(userDirectory)
        .get('/payment-plans/' + id)
        .then(res => {
          expect(res).have.status(200);
          expect(res.body)
            .have.property('id')
            .and.be.equal(id);
        });
    });
  });

  describe('PUT: /payment-plans/{id}', () => {
    it('Should update the payment plan with id ' + id, () => {
      const UPDATED_NAME = 'updated name';
      const data = Object.assign({}, sample, { name: UPDATED_NAME });
      return chai
        .request(userDirectory)
        .put('/payment-plans/' + id)
        .send(data)
        .then(res => {
          expect(res).have.status(200);
          return chai
            .request(userDirectory)
            .get('/payment-plans/' + id)
            .then(res => {
              expect(res).have.status(200);
              expect(res.body.name).equal(UPDATED_NAME);
              const NEW_NAME = 'new name';
              return chai
                .request(userDirectory)
                .put('/payment-plans/' + id)
                .send(Object.assign(data, { name: NEW_NAME }))
                .then(res => {
                  expect(res).have.status(200);
                  return chai
                    .request(userDirectory)
                    .get('/payment-plans/' + id)
                    .then(res => {
                      expect(res).have.status(200);
                      expect(res.body.name).equal(NEW_NAME);
                    });
                });
            });
        });
    });
  });

  describe('DELETE: /payment-plans/{id}', () => {
    it('Should delete payment plan', () => {
      return chai
        .request(userDirectory)
        .post('/payment-plans')
        .send(sample)
        .then(res => {
          expect(res).have.status(200);
          expect(res.body).has.property('id');

          return chai
            .request(userDirectory)
            .delete('/payment-plans/' + res.body.id)
            .then(res => {
              expect(res).have.status(200);
              return chai
                .request(userDirectory)
                .get('/payment-plans/' + res.body.id)
                .then(res => {
                  expect(res).have.status(400);
                });
            });
        });
    });
  });
});
