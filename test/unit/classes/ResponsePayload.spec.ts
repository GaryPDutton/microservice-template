// Setup testing tools
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

// Setup requirements for this test
import ResponsePayload from './../../../src/classes/ResponsePayload';

describe('Unit: src/classes/ResponsePayload', () => {
    let fakeRequest, fakeResponse;

    beforeEach(() => {
        fakeRequest = {
            headers: {
                host: 'fake-host'
            },
            url: 'fake-url',
            method: 'fake-method',
            correlationId: 'fake-correlation-id',
        };

        fakeResponse = {
            statusCode: 200
        };
    });

    it('should set the correct properties without user', () => {
        const newRequestPayload = new ResponsePayload(fakeRequest, fakeResponse);
        expect(newRequestPayload._messageType).to.be.equal('RESPONSE');
        expect(newRequestPayload._user).to.be.equal('unknown');
        expect(newRequestPayload._sourceUri).to.be.equal('fake-host');
        expect(newRequestPayload._destination).to.be.equal('fake-url');
        expect(newRequestPayload._method).to.be.equal('fake-method');
        expect(newRequestPayload._correlationId).to.be.equal('fake-correlation-id');
        expect(newRequestPayload._status).to.be.equal(200);
    });


    it('should set the correct properties with user', () => {
        fakeRequest.user = { username: 'Gary Dutton' };
        const newRequestPayload = new ResponsePayload(fakeRequest, fakeResponse);
        expect(newRequestPayload._messageType).to.be.equal('RESPONSE');
        expect(newRequestPayload._user).to.be.equal('Gary Dutton');
        expect(newRequestPayload._sourceUri).to.be.equal('fake-host');
        expect(newRequestPayload._destination).to.be.equal('fake-url');
        expect(newRequestPayload._method).to.be.equal('fake-method');
        expect(newRequestPayload._correlationId).to.be.equal('fake-correlation-id');
        expect(newRequestPayload._status).to.be.equal(200);
    });

});