const pool=require( '../DatabaseAuth.js');
const User  = require('../models/User.js');

exports.getAllUsers = async (req, res) => {
    try {
      const result = await pool.query('SELECT username, password, "groupId" FROM auth;');
      const users = result.rows.map((row) => User.fromDatabaseRow(row));
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Internal Server Error');
    }
  };

  exports.addUser = async (req, res) => {
    const { username, password, groupId } = req.body;
  
    if (!username || !password || !groupId) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    try {
      const existingUserResult = await pool.query(
        'SELECT * FROM auth WHERE username = $1;',
        [username]
      );
  
      if (existingUserResult.rows.length > 0) {
        return res.status(409).json({ error: 'Username already exists.' }); 
      }
 
      const result = await pool.query(
        'INSERT INTO auth (username, password, "groupId") VALUES ($1, $2, $3) RETURNING *;',
        [username, password, groupId]
      );
  
      const newUser = User.fromDatabaseRow(result.rows[0]);
      res.status(201).json(newUser); 
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  