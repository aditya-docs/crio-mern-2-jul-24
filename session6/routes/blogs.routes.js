const router = require("express").Router();
const {
  createBlog,
  getBlogs,
  getBlogById,
  deleteBlogById,
  updateBlogById,
} = require("../controllers/blogs.controllers");
const verifyAuth = require("../middlewares/verifyAuth");

router.route("/").get(getBlogs).post(createBlog);

router
  .route("/:blogId")
  .get(getBlogById)
  .delete(deleteBlogById)
  .patch(updateBlogById);

module.exports = router;
