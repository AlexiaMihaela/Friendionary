const request = require('supertest');
const app = require('./server.js'); 
const pool = require('./DatabaseAuth.js'); 

beforeEach(async () => {
  await pool.query('DELETE FROM auth;');
});

afterAll(async () => {
  await pool.end(); 
});

describe('API Integration Tests', () => {
  test('GET /api/auth should return all users', async () => {

    await pool.query(
      'INSERT INTO auth (username, password, "groupId") VALUES ($1, $2, $3), ($4, $5, $6);',
      ['user1', 'pass1', 1, 'user2', 'pass2', 2]
    );

    const res = await request(app).get('/api/auth');


    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      { _username: 'user1', _password: 'pass1', _groupId: '1' },
      { _username: 'user2', _password: 'pass2', _groupId: '2' },
    ]);
  });

  test('POST /api/auth/register should add a new user', async () => {
    const newUser = {
      username: 'newUser',
      password: 'newPass',
      groupId: 1,
    };
  
    const res = await request(app)
      .post('/api/auth/register')
      .send(newUser);
  
 
    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      _username: 'newUser',
      _password: 'newPass',
      _groupId: '1', 
    });
  
 
    const dbRes = await pool.query('SELECT * FROM auth WHERE username = $1;', ['newUser']);
  expect(dbRes.rows.length).toBe(1);
  expect(dbRes.rows[0]).toEqual({
    username: 'newUser',    
    password: 'newPass',    
    groupId: '1',           
  });
  });
  
  
});