// Setup testing tools
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

import startApp from './../../src/app';
const https = require('https');
const express = require('body-parser');
const bodyParser = require('cookie-parser');
const cookieParser = require('https');
const helmet = require('helmet');
const boom = require('express-boom');


describe('src/app', () => {
    let fakeServer;

    beforeEach(() => {
        fakeServer = { listen: (port, cb) => cb()};

        sinon.stub(https, 'createServer').returns(fakeServer);
        sinon.spy(fakeServer, 'listen');
    });

    afterEach(() => {
        https.createServer.restore();
    });

    let fakeConfig;

    beforeEach(() => {
        fakeConfig = {
            APP_NAME: 'fake-app-name',
            APP_PORT: 'fake-node-port',
            SSL_KEY: 'fake-node-ssl-key',
            SSL_CERT: 'fake-node-ssl-cert'
        };

        startApp(fakeConfig);
    });

    describe('Unit: src/app', () => {

        it('should listen on the right port', () => {
            expect(fakeServer.listen).to.have.been.calledWith('fake-node-port' );
        });

        it('should use the server options provided in the config', () => {
            expect(https.createServer).to.have.been.calledWith({ key: fakeConfig.SSL_KEY, cert: fakeConfig.SSL_CERT });
        });
    });
});