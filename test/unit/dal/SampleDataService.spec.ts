// Setup testing tools
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

import SampleDataService from './../../../src/dal/SampleDataService';

describe('Unit: /dal/SampleDalService', function () {

    beforeEach(() => {
        if (SampleDataService.data.length > 0) SampleDataService.data = [];
    });

    it('should return a blank array when data is accessed for the first time', () => {
        expect(SampleDataService.data).to.be.an('array');
        expect(SampleDataService.data.length).to.be.equal(0);
    });

    it('should return a blank array when get is called for the first time', (done) => {
        SampleDataService.get().then((data) => {
            expect(data).to.be.an('array');
            expect(data.length).to.be.equal(0);
            done();
        }).catch(exception => done(exception));
    });

    it('should add a record to the data array when add is called', (done) => {
        SampleDataService.add({ name: 'Gary'}).then((data) => {
            expect(data).to.be.an('object');
            expect(data.id).to.be.equal(0);
            done();
        }).catch(exception => done(exception));
    });

    it('should update a record in the data array when update is called', (done) => {
        SampleDataService.data = [{ id: 0 , name: 'Gary'}];
        SampleDataService.update({ id: 0 , name: 'Bob'}).then((data) => {
            expect(data.name).to.be.equal('Bob');
            done();
        }).catch(exception => done(exception));
    });

    it('should return an error if no id is passed in the item to update', (done) => {
        SampleDataService.data = [{ id: 0 , name: 'Gary'}];
        SampleDataService.update({name: 'Bob'}).then((result) => {
            done();
        }).catch(exception => {
            expect(exception).to.be.an('Error');
            done();
        });
    });


    it('should mark a record as deleted in the data array when remove is called', (done) => {
        SampleDataService.data = [{ id: 0 , name: 'Gary'}];
        SampleDataService.remove({ id: 0 , name: 'Gary'}).then((result) => {
            expect(result).to.be.equal(true);
            expect(SampleDataService.data[0].deleted).to.be.equal(true);
            done();
        }).catch(exception => done(exception));
    });

    it('should return an error if no id is passed in the item to remove', (done) => {
        SampleDataService.data = [{ id: 0 , name: 'Gary'}];
        SampleDataService.remove({name: 'Gary'}).then((result) => {
            done();
        }).catch(exception => {
            expect(exception).to.be.an('Error');
            done();
        });
    });


    it('should return all records in the data array when remove is called', (done) => {
        SampleDataService.data = [{ id: 0 , name: 'Gary'}, { id: 1 , name: 'Bob'}];
        SampleDataService.get().then((data) => {
            expect(data).to.be.an('array');
            expect(data.length).to.be.equal(2);
            done();
        }).catch(exception => done(exception));
    });

    it('shouldnt return deleted records in the data array when remove is called', (done) => {
        SampleDataService.data = [{ id: 0 , name: 'Gary', deleted: true}, { id: 1 , name: 'Bob'}];
        SampleDataService.get().then((data) => {
            expect(data).to.be.an('array');
            expect(data.length).to.be.equal(1);
            done();
        }).catch(exception => done(exception));
    });

    it('should return matching record in the data array when getById is called', (done) => {
        SampleDataService.data = [{ id: 0 , name: 'Gary'}, { id: 1 , name: 'Bob'}];
        SampleDataService.getById(1).then((item) => {
            expect(item).to.be.an('object');
            expect(item.name).to.be.equal('Bob');
            done();
        }).catch(exception => done(exception));
    });

    it('should not return matching record in the data array when getById is called and it was deleted', (done) => {
        SampleDataService.data = [{ id: 0 , name: 'Gary'}, { id: 1 , name: 'Bob' , deleted: true}];
        SampleDataService.getById(1).then((item) => {
            expect(item).to.be.equal(undefined);
            done();
        }).catch(exception => done(exception));
    });

});