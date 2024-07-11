const router = require("express").Router();
const {
  getUsers,
  getUserById,
  searchUsersByGenderOrAge,
} = require("../controllers/users.controllers");
const verifyAuth = require("../middlewares/verifyAuth");
const userSearchValidator = require("../middlewares/userSearchValidator");

router.get("/", getUsers);
// router.use(verifyAuth);
router.get(
  "/search",
  verifyAuth,
  userSearchValidator,
  searchUsersByGenderOrAge
);
router.get("/:uuid", getUserById);

module.exports = router;
