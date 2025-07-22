import pool from '../config/db.js';


export const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT id, name, email, password_hash, is_verified  FROM users WHERE email = $1', [email]);
  return result.rows[0]; 
};

export const createUser = async (name, email, hashedPassword) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING
     RETURNING id, name, email`,
    [name, email, hashedPassword] // ← you forgot code param in values list
  );
  return result.rows[0];
};

export const updateUserSingleColumn = async (columnName, columnValue, userId) => {
  const allowedColumns = ['name', 'email', 'is_verified']; 
  if (!allowedColumns.includes(columnName)) {
    throw new Error('Invalid column name');
  }

  const query = `UPDATE users SET ${columnName} = $1 WHERE id = $2`;
  const result = await pool.query(query, [columnValue, userId]);
  return result;
};

