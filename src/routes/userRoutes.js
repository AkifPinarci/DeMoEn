// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const loginUser = require("../controllers/authController");
const passport = require("passport");
const authorizeRole = require("../middlewares/authorizeRole");
const { body, validationResult } = require("express-validator");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
    body("role").isIn(["user", "admin"]).withMessage("Invalid role specified"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createUser
);

// GET: Get all users
router.get("/", passport.authenticate("jwt", { session: false }), getUsers);

// GET: Get user by ID
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getUserById
);

// PUT: Update user by ID
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateUser
);

// DELETE: Delete user by ID
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("admin"),
  deleteUser
);

router.post("/login", loginUser);

module.exports = router;
