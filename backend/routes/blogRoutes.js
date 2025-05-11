const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const upload = require("../middlewares/uploadMiddleware");
const {createBlog,allBlogs,singleBlog,userBlogs} = require("../controllers/blogController");



//Upload a blog
router.post("/createBlog",upload.single("cover_image"),authMiddleware, createBlog);
router.get("/allBlogs", allBlogs);
router.get("/singleBlog/:id",authMiddleware,singleBlog);
router.get("/user/:id",userBlogs);


module.exports = router;