// Setup testing tools
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

// Setup requirements for this test
import * as express from 'express';
import sampleApi from './../../../src/routes/sampleApi';

describe('Unit: src/routes/sampleApi', () => {
    let fakeApp;

    beforeEach(() => {
        fakeApp = express();

        sinon.spy(fakeApp, 'get');
        sinon.spy(fakeApp, 'post');
        sinon.spy(fakeApp, 'put');
        sinon.spy(fakeApp, 'delete');

        sampleApi(fakeApp);
    });

    afterEach(() => {
        fakeApp = undefined;
    });

    describe('When a request is received', () => {

        it('should add the get route', () => {
            expect(fakeApp.get).to.have.been.calledWith('/api/sample');
        });

        it('should add the getById route', () => {
            expect(fakeApp.get).to.be.calledWith('/api/sample/:id');
        });

        it('should add the post route', () => {
            expect(fakeApp.post).to.have.been.calledWith('/api/sample');
        });

        it('should add the put route', () => {
           expect(fakeApp.put).to.have.been.calledWith('/api/sample/:id');
        });

        it('should add the delete route', () => {
            expect(fakeApp.delete).to.have.been.calledWith('/api/sample/:id');
        });



    });
});