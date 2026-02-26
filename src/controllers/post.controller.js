const postModel = require("../models/post.model");

const createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        error: "badRequest",
        message: "title et content sont obligatoires",
      });
    }

    const id = await postModel.createPost(req.userId, title, content); // ← req.userId

    res.status(201).json({
      message: "Post créé",
      id,
      userId: req.userId, // ← req.userId
      title,
      content,
    });
  } catch (error) {
    next(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await postModel.findAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

module.exports = { createPost, getAllPosts };

//! je pourrais ajouter de la sécurité, mais c'était surtout pour avoir l'idée