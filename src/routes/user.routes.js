const pool = require("../config/db");
const validateUser = require("../middlewares/user");
const router = require("express").Router();
const userController = require('../controllers/user.controller')



router.post('/', validateUser, userController.createUser)



router.get("/", async (req, res, next) => {
  try {
    const [users] = await pool.query("SELECT id, email FROM users");
    res.json(users);
  } catch (error) {
    next(error);
  }
});


module.exports = router;