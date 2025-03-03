// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  addWordToKnownWords,
  removeWordFromKnownWords,
  addWordToLearningWords,
  removeWordFromLearningWords,
  calculateKnownWordsFromMovie,
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

// POST: Add Word to user's known words
router.post(
  "/:id/known_words",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("user"),
  addWordToKnownWords
);

// DELETE: Remove Word from user's known words
router.delete(
  "/:id/known_words",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("user"),
  removeWordFromKnownWords
);

// Post: Add Word to user's learning words
router.post(
  "/:id/learning_words",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("user"),
  addWordToLearningWords
);

// DELETE: Remove Word from user's learning words
router.delete(
  "/:id/learning_words",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("user"),
  removeWordFromLearningWords
);

// Add the new route
router.post("/calculate-known-words", calculateKnownWordsFromMovie);

router.post("/login", loginUser);

module.exports = router;
