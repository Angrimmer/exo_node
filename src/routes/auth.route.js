const pool = require("../config/db");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "badRequest", message: "Champs manquants" });
    }

    const [rows] = await pool.query(
      "SELECT id,email,password from users WHERE email = ? LIMIT 1 ",
      [email],
    );

    if (rows.length === 0) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "identifiants invalides",
      });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Identifiants invalides",
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });

    res.json({
      message: "login ok",
      token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;