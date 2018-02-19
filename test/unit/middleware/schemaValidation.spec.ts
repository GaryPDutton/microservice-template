// Setup testing tools
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

import validationMiddleware from './../../../src/middleware/schemaValidation';
const Joi = require('joi');

describe('src/middleware/schemaValidation', () => {
    let fakeRequest;
    let fakeResponse;
    let fakeNext;
    let schema;

    beforeEach(() => {
        fakeRequest = {
            body: {
                id: 1234,
                name: 'Smith'
            }
        };

        fakeResponse = {};
        fakeNext =  sinon.stub();

        schema = {
            body: Joi.object().keys({
                id: Joi.number().required(),
                name: Joi.string()
            })
        };
    });

    it('should call next', (done) => {
        validationMiddleware(schema)(fakeRequest, fakeResponse, fakeNext).then(() => {
            expect(fakeNext).to.have.been.called;
            done();
        });
    });

    it('should error if  next', (done) => {
        fakeRequest.body.id = 'a string';
        validationMiddleware(schema)(fakeRequest, fakeResponse, fakeNext).then(() => {
            done();
        }).catch(() => {
            expect(fakeNext).to.have.been.calledWithNew('ValidationError');
            done();
        });
    });
});