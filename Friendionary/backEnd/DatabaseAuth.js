
const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'friendionary',
  password: '1q2w3e',
  port: 5433,
});

module.exports = pool;