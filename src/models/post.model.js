const pool = require("../config/db");

const createPost = async (userId, title, content) => {
  const [result] = await pool.query(
    "INSERT INTO post (userId, title, content) VALUES (?, ?, ?)",
    [userId, title, content]
  );
  return result.insertId;
};

const findAllPosts = async () => {
  const [rows] = await pool.query(
    "SELECT post.id, post.title, post.content, post.created_at, users.email AS author FROM post JOIN users ON post.userId = users.id ORDER BY post.created_at DESC"
  );
  return rows;
};

module.exports = { createPost, findAllPosts };