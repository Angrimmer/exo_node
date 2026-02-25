const pool = require("../config/db");

const findByEmail = async (email) => {
  const [rows] = await pool.query(
    "SELECT ID, email, password FROM users WHERE email = ? LIMIT 1",
    [email],
  );
  return rows[0];
};

const createUser = async (email, hashedPassword) => {
  const [result] = await pool.query(
    "INSERT INTO users (email, password) VALUES (?,?)",
    [email, hashedPassword],
  );
  return result.insertId;
};

  const findAllPublic = async () => {
    const [rows] = await pool.query(
      "SELECT id, email FROM users ORDER BY id DESC"
  );
  return rows;
};


module.exports = { findByEmail, createUser, findAllPublic };