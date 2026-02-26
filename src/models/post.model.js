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

//? vérifier que le post est bien celui de l'user qui l'à écrit
const findPostById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM post WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0];
};

const updatePost = async (id, title, content) => {
  const [result] = await pool.query(
    "UPDATE post SET title = ?, content = ? WHERE id = ?",
    [title, content, id]
  );
  return result.affectedRows;
};

const deletePost = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM post WHERE id = ?",
    [id]
  );
  return result.affectedRows;
};

module.exports = { createPost, findAllPosts, findPostById, updatePost, deletePost };