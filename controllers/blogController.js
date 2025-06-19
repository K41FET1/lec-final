const Blog = require("../models/Blog");
const User = require("../models/User");

exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find().populate("author");
  res.json(blogs);
};

exports.getBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("author");
  if (!blog) return res.status(404).json({ error: "Not found" });
  res.json(blog);
};

exports.createBlog = async (req, res) => {
  const blog = await Blog.create({
    ...req.body,
    coverImage: req.file ? req.file.filename : "",
    author: req.user.id,
  });

  await User.findByIdAndUpdate(req.user.id, {
    $push: { posts: blog._id },
  });

  res.status(201).json(blog);
};

exports.updateBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(blog);
};

exports.deleteBlog = async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted", blog });
};
