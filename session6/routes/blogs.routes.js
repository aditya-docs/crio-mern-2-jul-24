const router = require("express").Router();
const {
  createBlog,
  getBlogs,
  getBlogById,
  deleteBlogById,
  updateBlogById,
  searchBlogs,
} = require("../controllers/blogs.controllers");

const blogSearchValidator = require("../middlewares/blogSearchValidator");

router.route("/").get(getBlogs).post(createBlog);

router.get("/search", blogSearchValidator, searchBlogs);

router
  .route("/:blogId")
  .get(getBlogById)
  .delete(deleteBlogById)
  .patch(updateBlogById);

module.exports = router;
