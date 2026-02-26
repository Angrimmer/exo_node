const bcrypt = require("bcrypt");
const user = require("../models/user.model");

const createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existing = await user.findByEmail(email);

    if (existing) {
      return res.status(400).json({
        error: "conflict",
        message: "Email déja utilisé",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const id = await user.createUser(email, hashedPassword);

    res.status(201).json({
      message: "utilisateur crée",
      id,
      email,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        error: " conflict",
        message: "Email déja utilisé",
      });
    }
    next(error);
  }
};

const listUsers = async (req, res, next) => {
    try {
        const users = await user.findAllPublic();
        res.json(users)
    } catch (err) {
        next(err)
    }
}

const getMe = async (req, res, next) => {
  try {
    const me = await user.getTheConnectedIdiot(req.userId);
    
    if (!me) {
      return res.status(404).json({ error: "not found", message: "Utilisateur introuvable"});
    }
    res.status(200).json(me);
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, listUsers, getMe };