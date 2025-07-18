const pool = require('../config/db');

const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0]; 
};

const createUser = async (name, email, hashedPassword) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING;
     RETURNING id, name, email`,
    [name, email, hashedPassword]
  );
  return result.rows[0]; 
};

module.exports = {
  findUserByEmail,
  createUser
};


