const request = require('supertest');
const app = require('./server.js');

describe('Performance Test', () => {
  const NUMBER_OF_REQUESTS = 100; 
  const CONCURRENCY = 10;        

  const users = Array.from({ length: NUMBER_OF_REQUESTS }, (_, i) => ({
    username: `user${i}`,
    password: `password${i}`,
    groupId: 1,
  }));

  test('POST /api/auth/register - performance under load', async () => {
    const startTime = Date.now();
    const responses = await Promise.all(
      users.map((user) =>
        request(app).post('/api/auth/register').send(user)
      )
    );
    const endTime = Date.now();

    responses.forEach((res) => {
      expect(res.status).toBe(201);
    });

    const totalTime = endTime - startTime;
    console.log(`Total Time: ${totalTime}ms`);
    console.log(`Requests per second: ${(NUMBER_OF_REQUESTS / (totalTime / 1000)).toFixed(2)}`);

    expect(totalTime).toBeLessThan(5000);
  });
});
