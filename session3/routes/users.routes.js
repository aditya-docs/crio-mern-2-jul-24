const router = require("express").Router();
const {
  getUsers,
  getUserById,
  searchUsersByGenderOrAge,
} = require("../controllers/users.controllers");

router.get("/", getUsers);
router.get("/search", searchUsersByGenderOrAge);
router.get("/:uuid", getUserById);

module.exports = router;
