const request = require('supertest');
const app = require('../server');

describe('Server Endpoints', () => {
    test('Health check endpoint should return 200', async () => {
        const response = await request(app).get('/health');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('healthy');
    });

    test('POST /api/data should accept and return data', async () => {
        const testData = { test: 'value' };
        const response = await request(app)
            .post('/api/data')
            .send(testData);
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual(testData);
    });

    test('GET /api/data should return sample data', async () => {
        const response = await request(app).get('/api/data');
        expect(response.status).toBe(200);
        expect(response.body.data).toBeDefined();
    });
}); 