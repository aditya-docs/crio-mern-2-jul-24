const BlogService = require("../services/blog.service");
const BlogServiceInstance = new BlogService();

const getBlogs = async (req, res) => {
  try {
    res.send(await BlogServiceInstance.getAll());
  } catch (error) {
    res.status(500).send({ message: "Oops! Something went wrong. Try again." });
  }
};

const getBlogById = async (req, res) => {
  try {
    const reqBlog = await BlogServiceInstance.getById(req.params.blogId);
    if (reqBlog) return res.send(reqBlog);
    res.status(404).send({ message: "Blog not found" });
  } catch (error) {
    res.status(500).send({ message: "Oops! Something went wrong. Try again." });
  }
};

const createBlog = async (req, res) => {
  try {
    const newBlog = BlogServiceInstance.create(req.body);
    await BlogServiceInstance.save(newBlog);
    res.status(201).send(newBlog);
  } catch (error) {
    if (error.code === 11000)
      return res
        .status(409)
        .send({ message: `Blog with this title already exists` });
    if (error._message === "Blog validation failed")
      return res.status(400).send({ message: error.message });
    res.status(500).send({ message: "Oops something went wrong" });
  }
};

const deleteBlogById = async (req, res) => {
  const { blogId } = req.params;
  try {
    const reqBlog = await BlogServiceInstance.getById(blogId);
    if (reqBlog) {
      await BlogServiceInstance.deleteById(blogId);
      return res.sendStatus(204);
    }
    res.status(404).send({ message: "Blog not found" });
  } catch (error) {
    res.status(500).send({ message: "Oops! Something went wrong. Try again." });
  }
};

const updateBlogById = async (req, res) => {
  const { blogId } = req.params;
  try {
    const reqBlog = await BlogServiceInstance.getById(blogId);
    if (reqBlog) {
      const updatedBlog = await BlogServiceInstance.updateById(
        blogId,
        req.body
      );
      return res.status(200).send(updatedBlog);
    }
    res.status(404).send({ message: "Blog not found" });
  } catch (error) {
    res.status(500).send({ message: "Oops! Something went wrong. Try again." });
  }
};

const searchBlogs = async (req, res) => {
  const { title, author } = req.query;
  // res.send(await Blog.find({ title: title }));
  // res.send(await Blog.find());
  if (author && title)
    return res.send(
      await BlogServiceInstance.findByAuthorAndTitle(author, title)
    );
  if (author) return res.send(await BlogServiceInstance.findByAuthor(author));
  if (title) return res.send(await BlogServiceInstance.findByTitle(title));
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  deleteBlogById,
  updateBlogById,
  searchBlogs,
};
