// Setup testing tools
import { expect } from 'chai';

const request = require('supertest');
const url = 'https://localhost:3000';

describe('Integration: Status endpoint', function () {
    it('It should get a valid response for the GET method', async () => {
        const response = await request(url).get('/api/status');
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('OK');
    });
});