import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URI
});

// const res = await pool.query('SELECT current_database()');
// console.log('🧠 Connected to DB:', res.rows[0].current_database);

// pool.query('SELECT NOW()')
//   .then(res => console.log('✅ DB Connected at:', res.rows[0].now))
//   .catch(err => console.error('❌ Connection error:', err));

//   const result = await pool.query(`
//   SELECT table_name
//   FROM information_schema.tables
//   WHERE table_schema = 'public';
// `);

// console.log('Tables:', result.rows);

export default pool;