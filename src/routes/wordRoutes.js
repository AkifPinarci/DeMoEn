const express = require("express");
const router = express.Router();
const {
  addWord,
  getWordByWord,
  getWordsByLevel,
  addWords,
} = require("../controllers/wordController");

router.post("/", addWord);
router.post("/bulk", addWords);

router.get("/:word", getWordByWord);

router.get("/level/:level", getWordsByLevel);

module.exports = router;
