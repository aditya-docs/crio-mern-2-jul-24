const Blog = require("../models/blog.model");

class BlogService {
  getAll = () => Blog.find();

  getById = (blogId) => Blog.findById(blogId);

  create = (payload) => new Blog(payload);

  save = (newBlog) => newBlog.save();

  deleteById = (blogId) => Blog.findByIdAndDelete(blogId);

  updateById = (blogId, payload) =>
    Blog.findByIdAndUpdate(blogId, payload, { new: true });

  findByAuthorAndTitle = (author, title) =>
    Blog.find({
      $and: [
        { title: new RegExp(title, "i") },
        { authors: { $elemMatch: { email: author } } },
      ],
    });

  findByTitle = (title) => Blog.find({ title: new RegExp(title, "i") });

  findByAuthor = (author) =>
    Blog.find({ authors: { $elemMatch: { email: author } } });
}

module.exports = BlogService;
