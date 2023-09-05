import request from 'supertest';

import createServer from '../../src/server/server';

const server = createServer();

describe('server', () => {
  it("should create without error", (done) => {
    request(server).get("/").expect(200, done);
  })
})