import request from 'supertest';

import createServer from '../../src/server/server';

const server = createServer();

describe('todos routes', () => {
  it("should create without error", (done) => {
    request(server).get("/todos").expect(200, done);
  })
})