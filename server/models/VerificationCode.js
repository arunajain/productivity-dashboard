const pool = require('../config/db');
const createVerificationCode = async(userId, code, expireAt) => {
    await pool.query('delete from verification_codes where user_id = $1', [userId]);
    await pool.query('insert into verification_codes(user_id, code, expires_at) values ($1, $2, $3)', [userId, code, expireAt]);
};


const validateCode = async(userId, code) => {
    const result = await pool.query('select * from verification_codes where user_id = $1 and code = $2 and expires_at > now()', [userId, code]);
    return result.rows[0];
};

const deleteCodes = async (userId) => {
  await pool.query('DELETE FROM verification_codes WHERE user_id = $1', [userId]);
};
module.exports = {createVerificationCode, validateCode, deleteCodes}