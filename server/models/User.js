import pool from '../config/db.js';

export const getUserById = async(user_id) => {
  const result = await pool.query(`Select * from users where id = $1`,[user_id]);
  return result.rows[0];
}

export const findUserByEmail = async (email) => {
  const result = await pool.query('select id, name, email, password_hash, is_verified  from users where email = $1', [email]);
  return result.rows[0]; 
};

export const createUser = async (name, email, hashedPassword) => {
  const result = await pool.query(
    `insert into users (name, email, password_hash)
     values ($1, $2, $3) ON CONFLICT (email) do nothing
     returning id, name, email`,
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

