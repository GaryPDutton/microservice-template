// Setup testing tools
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

import validationMiddleware from './../../../src/middleware/sampleCustomValidator';
import ValidationError from './../../../src/errors/ValidationError';

describe('src/middleware/sampleCustomValidator', () => {
    let fakeRequest;
    let fakeResponse;
    let fakeNext;
    let fakeError;

    beforeEach(() => {
        fakeRequest = {
            params: {
                id: 1234
            },
            body: {
                id: 1234,
                name: 'Smith'
            }
        };

        fakeError = undefined;

        fakeResponse = {};
        fakeNext = sinon.spy(function(error) {
          fakeError = error;
        });
    });

    it('should call next', () => {
        validationMiddleware(fakeRequest, fakeResponse, fakeNext);
        expect(fakeNext).to.have.been.calledWith();
    });

    it('should call next with ValidationError if body.id is different from params.id', () => {
        fakeRequest.body.id = '4321';
        validationMiddleware(fakeRequest, fakeResponse, fakeNext);
        expect(fakeError.message).to.be.equal('Parameter ID does not match items ID');
    });

    it('should call next with ValidationError if body is undefined', () => {
        fakeRequest.body = undefined;
        validationMiddleware(fakeRequest, fakeResponse, fakeNext);
        expect(fakeError.message).to.be.equal('Invalid or missing item');
    });
});