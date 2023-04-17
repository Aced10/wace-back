const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middleware/auth");
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

// GET all users
router.get("/", checkAuth, getUsers);

// GET suer by Id
router.get("/:id", checkAuth, getUserById);

// ADD a new user
router.post("/", createUser);

// UPDATE user by Id
router.put("/:id", checkAuth, updateUser);

// DELETE user by Id
router.delete("/:id", checkAuth, deleteUser);

module.exports = router;
