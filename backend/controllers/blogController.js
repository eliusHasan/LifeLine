const fs = require("fs");
const path = require("path");
const {cloudinary} = require("../config/cloudinary");
const Blog = require("../models/Blog");


exports.createBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    let coverImage = null;
    if(req.file){
      const localPath = req.file.path;
      const result = await cloudinary.uploader.upload(localPath, {
        folder: "uploads/blogs",
        transformation: [{ width: 800, height: 800, crop: "limit" }],
      });
      coverImage = result.secure_url;
      fs.unlink(localPath, (err) => {
        if (err) console.error("Failed to delete local file:", err);
      });
    }
    // const coverImage = req.file ? req.file.path : null;
    const authorID = req.user.id;

    const newBlog = new Blog({
      title,
      content,
      category,
      coverImage,
      authorID
    });
    await newBlog.save();

    res.status(200).json({
      message: "Blog created successfully",
      blog: newBlog,
    });


  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.allBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('authorID','name profileImage')
      .sort({createdAt: -1});
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({message:"Failed to fetch blogs",error:error.message});
  }
}

exports.singleBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id).populate('authorID', 'name profileImage');

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch the blog', error: error.message });
  }
};


exports.userBlogs = async (req, res) => {
  try {
    const { id } = req.params;
    const blogs = await Blog.find({ authorID: id }).select("_id title");
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({message: "Failed to fetch blogs",error: error.message});
  }
}
