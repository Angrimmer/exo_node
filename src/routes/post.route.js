const router = require("express").Router();
const auth = require ("../middlewares/auth");
const postController = require ("../controllers/post.controller");

router.post("/", auth, postController.createPost);

module.exports = router;