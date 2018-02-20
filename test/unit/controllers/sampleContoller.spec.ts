// Setup testing tools
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

import SampleDataService from './../../../src/dal/SampleDataService';
import SampleController from './../../../src/controllers/SampleController';


describe('Unit: /dal/SampleController', function () {
    let fakeRequest;
    let fakeResponse;
    let fakeNext;

    beforeEach(() => {
        fakeRequest = {
            params: {
                id: '1'
            }
        };
        fakeResponse = {};
        fakeResponse.status = sinon.stub().returns(fakeResponse);
        fakeResponse.json = sinon.stub().returns(fakeResponse);
        fakeNext = sinon.stub();

        sinon.stub(SampleDataService, 'get').returns(Promise.resolve([]));
        sinon.stub(SampleDataService, 'getById').returns(Promise.resolve({}));
        sinon.stub(SampleDataService, 'add').returns(Promise.resolve({}));
        sinon.stub(SampleDataService, 'update').returns(Promise.resolve({}));
        sinon.stub(SampleDataService, 'remove').returns(Promise.resolve(true));
    });

    afterEach(() => {
        (SampleDataService.get as any).restore();
        (SampleDataService.getById as any).restore();
        (SampleDataService.add as any).restore();
        (SampleDataService.update as any).restore();
        (SampleDataService.remove as any).restore();
    });

    it('should call the SampleDataService.get when get is called', async () => {
        const result = await SampleController.get(fakeRequest, fakeResponse, fakeNext);
        expect(SampleDataService.get).to.have.been.called;
    });

    it('should call the response.status when get is called and data is returned', async () => {
        const result = await SampleController.get(fakeRequest, fakeResponse, fakeNext);
        expect(fakeResponse.status).to.be.calledWith(200);
    });

    it('should call the response.json when get is called and data is returned', async () => {
        const result = await SampleController.get(fakeRequest, fakeResponse, fakeNext);
        expect(fakeResponse.json).to.be.calledWith([]);
    });

    it('should call next with an error if get is called and an error is returned', async () => {
        (SampleDataService.get as any).returns(Promise.reject('Some Error'));
        const result = await SampleController.get(fakeRequest, fakeResponse, fakeNext);
        expect(fakeNext).to.have.been.called;
    });


    it('should call the SampleDataService.getById when getById is called', async () => {
        const result = await SampleController.getById(fakeRequest, fakeResponse, fakeNext);
        expect(SampleDataService.getById).to.have.been.called;
    });

    it('should call the response.status when getById is called and data is returned', async () => {
        const result = await SampleController.getById(fakeRequest, fakeResponse, fakeNext);
        expect(fakeResponse.status).to.be.calledWith(200);
    });

    it('should call the response.json when getById is called and data is returned', async () => {
        const result = await SampleController.getById(fakeRequest, fakeResponse, fakeNext);
        expect(fakeResponse.json).to.be.calledWith({});
    });

    it('should call next with an error if getById is called and an error is returned', async () => {
        (SampleDataService.getById as any).returns(Promise.reject('Some Error'));
        const result = await SampleController.getById(fakeRequest, fakeResponse, fakeNext);
        expect(fakeNext).to.have.been.called;
    });

    it('should call the SampleDataService.add when post is called', async () => {
        const result = await SampleController.post(fakeRequest, fakeResponse, fakeNext);
        expect(SampleDataService.add).to.have.been.called;
    });

    it('should call the response.status when post is called and data is returned', async () => {
        const result = await SampleController.post(fakeRequest, fakeResponse, fakeNext);
        expect(fakeResponse.status).to.be.calledWith(200);
    });

    it('should call the response.json when post is called and data is returned', async () => {
        const result = await SampleController.post(fakeRequest, fakeResponse, fakeNext);
        expect(fakeResponse.json).to.be.calledWith({});
    });

    it('should call next with an error if post is called and an error is returned', async () => {
        (SampleDataService.add as any).returns(Promise.reject('Some Error'));
        const result = await SampleController.post(fakeRequest, fakeResponse, fakeNext);
        expect(fakeNext).to.have.been.called;
    });

    it('should call the SampleDataService.update when put is called', async () => {
        const result = await SampleController.put(fakeRequest, fakeResponse, fakeNext);
        expect(SampleDataService.update).to.have.been.called;
    });

    it('should call the response.status when put is called and data is returned', async () => {
        const result = await SampleController.put(fakeRequest, fakeResponse, fakeNext);
        expect(fakeResponse.status).to.be.calledWith(200);
    });

    it('should call the response.json when put is called and data is returned', async () => {
        const result = await SampleController.put(fakeRequest, fakeResponse, fakeNext);
        expect(fakeResponse.json).to.be.calledWith({});
    });

    it('should call next with an error if put is called and an error is returned', async () => {
        (SampleDataService.update as any).returns(Promise.reject('Some Error'));
        const result = await SampleController.put(fakeRequest, fakeResponse, fakeNext);
        expect(fakeNext).to.have.been.called;
    });

    it('should call the SampleDataService.remove when remove is called', async () => {
        const result = await SampleController.remove(fakeRequest, fakeResponse, fakeNext);
        expect(SampleDataService.remove).to.have.been.called;
    });

    it('should call the response.status when remove is called and data is returned', async () => {
        const result = await SampleController.remove(fakeRequest, fakeResponse, fakeNext);
        expect(fakeResponse.status).to.be.calledWith(200);
    });

    it('should call the response.json when remove is called and data is returned', async () => {
        const result = await SampleController.remove(fakeRequest, fakeResponse, fakeNext);
        expect(fakeResponse.json).to.be.calledWith(true);
    });

    it('should call next with an error if put is called and an error is returned', async () => {
        (SampleDataService.remove as any).returns(Promise.reject('Some Error'));
        const result = await SampleController.remove(fakeRequest, fakeResponse, fakeNext);
        expect(fakeNext).to.have.been.called;
    });

});