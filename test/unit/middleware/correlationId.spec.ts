// Setup testing tools
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

import correlationIdMiddleware from './../../../src/middleware/correlationId';

describe('src/middleware/correlationId', () => {
    let fakeRequest;
    let fakeResponse;
    let fakeNext;

    beforeEach(() => {
        fakeRequest = {};
        fakeRequest.headers = {};
        fakeResponse = {};
        fakeNext =  sinon.stub();

        correlationIdMiddleware(fakeRequest, fakeResponse, fakeNext);
    });

    it('should attach the config to the request', () => {
        expect(fakeRequest.correlationId).to.be.an('string');
    });

    it('should be in a specific format', () => {
        expect(fakeRequest.correlationId).to.match(/[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}/);
    });

    it('should call next', () => {
        expect(fakeNext).to.have.been.called;
    });
});