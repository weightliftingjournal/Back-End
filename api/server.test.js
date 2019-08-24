const supertest = require('supertest');
const server = require('./server');

describe('GET /', () => {
  it('responds with 200 OK', async () => {
    let res = await supertest(server).get('/');
    expect(res.status).toBe(200);
  });
});
