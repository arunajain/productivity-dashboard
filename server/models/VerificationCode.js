import pool from '../config/db.js';
import { findUserByEmail } from './User.js';

export const createVerificationCode = async (userId, code, expireAt) => {
  await pool.query('DELETE FROM verification_codes WHERE user_id = $1', [userId]);
  await pool.query(
    'INSERT INTO verification_codes(user_id, code, expires_at) VALUES ($1, $2, $3)',
    [userId, code, expireAt]
  );
};

export const validateCode = async (email, code) => {
  const res = await findUserByEmail(email);
  if (res && res.id) {
    const result = await pool.query(
      'SELECT * FROM verification_codes WHERE user_id = $1 AND code = $2 AND expires_at > now()',
      [res.id, code]
    );
    console.log('result from validate code - ', result)
    return result.rows[0];
  }
  return null;
};

export const deleteCodes = async (userId) => {
  await pool.query('DELETE FROM verification_codes WHERE user_id = $1', [userId]);
};