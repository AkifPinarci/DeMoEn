const express = require("express");
const router = express.Router();
const {
  addWord,
  getWordByWord,
  getWordsByLevel,
} = require("../controllers/wordController");

router.post("/block", addWord);

router.get("/:word", getWordByWord);

router.get("/level/:level", getWordsByLevel);

module.exports = router;
