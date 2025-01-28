const { getAllUsers, addUser } = require('./controller/authController.js');
const pool = require('./DatabaseAuth.js');

jest.mock('./DatabaseAuth.js', () => ({
  query: jest.fn(),
}));

describe('User Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllUsers: should fetch all users and return them as JSON', async () => {
    pool.query.mockResolvedValueOnce({
      rows: [
        { username: 'user1', password: 'pass1', groupId: 1 },
        { username: 'user2', password: 'pass2', groupId: 2 },
      ],
    });
  
    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  
    await getAllUsers(req, res);
  
    expect(res.json).toHaveBeenCalled();

    const users = res.json.mock.calls[0][0]; 
    expect(users).toHaveLength(2);
    expect(users[0]._username).toBe('user1');
    expect(users[0]._password).toBe('pass1');
    expect(users[0]._groupId).toBe(1);
    expect(users[1]._username).toBe('user2');
    expect(users[1]._password).toBe('pass2');
    expect(users[1]._groupId).toBe(2);
  });
  

  test('addUser: should return 400 if required fields are missing', async () => {
    const req = { body: {} }; 
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await addUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: 'All fields are required.',
    });
  });
});
