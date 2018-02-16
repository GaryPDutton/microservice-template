// Setup testing tools
import { expect } from 'chai';

const request = require('supertest');
const url = 'https://localhost:3000';

describe('Integration: Sample api', function () {
    it('It should get a valid response for the GET method', async () => {
        const response = await request(url).get('/api/sample');
        expect(response.status).to.equal(200);
    });

    it('It should get an array from the GET method', async () => {
        const response = await request(url).get('/api/sample');
        expect(response.body).to.be.an('array');
    });

    it('It should get a single matching record from the GET method when passed an ID', async () => {
        const response = await request(url).get('/api/sample/1');
        expect(response.body).to.be.an('object');
        expect(response.body.id).to.be.an('number');
    });

    it('It should get a Not Found error from the GET method when passed an ID that does not exist', async () => {
        const response = await request(url).get('/api/sample/9999');
        expect(response.status).to.equal(404);
    });

    it('It should get a Bad Request error from the GET method when passed an ID that is not a valid int', async () => {
        const response = await request(url).get('/api/sample/abcd');
        expect(response.status).to.equal(400);
    });

    it('It should add a record when a record is POSTED', async () => {
        const newRecord = { name: 'Mary' };
        const before = await request(url).get('/api/sample');
        const responsePost = await request(url).post('/api/sample').send(newRecord);
        const after = await request(url).get('/api/sample');

        expect(responsePost.status).to.equal(200);
        expect(responsePost.body).to.be.an('object');
        expect(responsePost.body.id).to.be.an('number');
        expect(after.body.length).to.be.equal(before.body.length + 1);
        expect(after.body[after.body.length - 1].name).to.be.equal('Mary');
    });

    it('It should update a record when a record is PUT', async () => {
        const recordToUpdate = { id: 2 , name: 'Judith' };
        const response = await request(url).put('/api/sample/2').send(recordToUpdate);

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body.id).to.be.equal(2);
        expect(response.body.name).to.be.equal('Judith');
    });

    it('It should get a Bad request error from the PUT method when passed an ID that does not match the id in the body', async () => {
        const recordToUpdate = { id: 1 , name: 'Judith' };
        const response = await request(url).put('/api/sample/2').send(recordToUpdate);

        expect(response.status).to.equal(400);
    });

    it('It should get a Not Found error from the PUT method when passed an ID that does not exist', async () => {
        const recordToUpdate = { id: 9999 , name: 'Judith' };
        const response = await request(url).put('/api/sample/9999').send(recordToUpdate);

        expect(response.status).to.equal(404);
    });

    it('It should get a success message when the DELETE method is passed a valid request', async () => {
        const recordToDelete = { id: 0 , name: 'Gary Dutton' };
        const response = await request(url).delete('/api/sample/0').send(recordToDelete);

        expect(response.status).to.equal(200);
    });

    it('It should get a Not Found error from the DELETE method when the record does not exist', async () => {
        const recordToDelete = { id: 9999 , name: 'Judith' };
        const response = await request(url).delete('/api/sample/9999').send(recordToDelete);

        expect(response.status).to.equal(404);
    });

    it('It should get a Bad request error from the DELETE method when passed an ID that does not match the id in the body', async () => {
        const recordToDelete = { id: 1 , name: 'Judith' };
        const response = await request(url).delete('/api/sample/2').send(recordToDelete);

        expect(response.status).to.equal(400);
    });
});