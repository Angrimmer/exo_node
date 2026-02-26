const router = require("express").Router();
const auth = require ("../middlewares/auth");
const postController = require ("../controllers/post.controller");

console.log("postController =", postController);

router.post("/", auth, postController.createPost);
router.get("/", postController.getAllPosts);      
router.patch("/:id", auth, postController.updatePost);
router.delete("/:id", auth, postController.deletePost);

module.exports = router;