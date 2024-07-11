const Blog = require("../models/blog.model");

const getBlogs = async (req, res) => {
  try {
    res.send(await Blog.find());
  } catch (error) {
    res.status(500).send({ message: "Oops! Something went wrong. Try again." });
  }
};

const getBlogById = async (req, res) => {
  try {
    const reqBlog = await Blog.findById(req.params.blogId);
    if (reqBlog) return res.send(reqBlog);
    res.status(404).send({ message: "Blog not found" });
  } catch (error) {
    res.status(500).send({ message: "Oops! Something went wrong. Try again." });
  }
};

const createBlog = async (req, res) => {
  try {
    // const newBlog = await Blog.create(req.body)
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.status(201).send(newBlog);
  } catch (error) {
    if (error.code === 11000)
      return res
        .status(409)
        .send({ message: `Blog with this title already exists` });
    if (error._message === "Blog validation failed")
      return res.status(400).send({ message: error.message });
    console.error(error);
    res.status(500).send({ message: "Oops something went wrong" });
  }
};

const deleteBlogById = async (req, res) => {
  try {
    const reqBlog = await Blog.findById(req.params.blogId);
    if (reqBlog) {
      await Blog.findByIdAndDelete(req.params.blogId);
      return res.sendStatus(204);
    }
    res.status(404).send({ message: "Blog not found" });
  } catch (error) {
    res.status(500).send({ message: "Oops! Something went wrong. Try again." });
  }
};

const updateBlogById = async (req, res) => {
  try {
    const reqBlog = await Blog.findById(req.params.blogId);
    if (reqBlog) {
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.blogId,
        req.body,
        { new: true }
      );
      return res.status(200).send(updatedBlog);
    }
    res.status(404).send({ message: "Blog not found" });
  } catch (error) {
    res.status(500).send({ message: "Oops! Something went wrong. Try again." });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  deleteBlogById,
  updateBlogById,
};
