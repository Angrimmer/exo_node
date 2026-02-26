const pool = require("../config/db");

const createPost = async (userId, title, content) => {
  const [result] = await pool.query(
    "INSERT INTO post (userId, title, content) VALUES (?, ?, ?)",
    [userId, title, content]
  );
  return result.insertId;
};

module.exports = { createPost };