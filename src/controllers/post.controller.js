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

const updatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const postId = req.params.id;

    // Récupérer le post pour vérifier le propriétaire
    const post = await postModel.findPostById(postId);

    if (!post) {
      return res.status(404).json({ error: "not found", message: "Post introuvable" });
    }

    if (post.userId !== req.userId) {
      return res.status(403).json({ error: "forbidden", message: "Tu n'es pas l'auteur de ce post" });
    }

    await postModel.updatePost(postId, title, content);

    res.status(200).json({ message: "Post modifié", id: postId, title, content });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;

    const post = await postModel.findPostById(postId);

    if (!post) {
      return res.status(404).json({ error: "not found", message: "Post introuvable" });
    }

    if (post.userId !== req.userId) {
      return res.status(403).json({ error: "forbidden", message: "Tu n'es pas l'auteur de ce post" });
    }

    await postModel.deletePost(postId);

    res.status(200).json({ message: "Post supprimé" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createPost, getAllPosts, updatePost, deletePost };

//! je pourrais ajouter de la sécurité, mais c'était surtout pour avoir l'idée