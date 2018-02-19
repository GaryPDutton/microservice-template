// Setup testing tools
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

// Setup requirements for this test
import RequestPayload from './../../../src/classes/RequestPayload';


describe('Unit: src/classes/RequestPayload', () => {
    let fakeRequest;

    beforeEach(() => {
        fakeRequest = {
            headers: {
                host: 'fake-host'
            },
            url: 'fake-url',
            method: 'fake-method',
            correlationId: 'fake-correlation-id',
        };
    });

    it('should set the correct properties without user', () => {
        const newRequestPayload = new RequestPayload(fakeRequest);
        expect(newRequestPayload._messageType).to.be.equal('REQUEST');
        expect(newRequestPayload._user).to.be.equal('unknown');
        expect(newRequestPayload._sourceUri).to.be.equal('fake-host');
        expect(newRequestPayload._destination).to.be.equal('fake-url');
        expect(newRequestPayload._method).to.be.equal('fake-method');
        expect(newRequestPayload._correlationId).to.be.equal('fake-correlation-id');
    });


    it('should set the correct properties with user', () => {
        fakeRequest.user = { username: 'Gary Dutton' };
        const newRequestPayload = new RequestPayload(fakeRequest);
        expect(newRequestPayload._messageType).to.be.equal('REQUEST');
        expect(newRequestPayload._user).to.be.equal('Gary Dutton');
        expect(newRequestPayload._sourceUri).to.be.equal('fake-host');
        expect(newRequestPayload._destination).to.be.equal('fake-url');
        expect(newRequestPayload._method).to.be.equal('fake-method');
        expect(newRequestPayload._correlationId).to.be.equal('fake-correlation-id');
    });

});