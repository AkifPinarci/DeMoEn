const express = require("express");
const router = express.Router();
const {
  addMovie,
  getMovieByTitle,
  getMovie,
} = require("../controllers/movieController");

router.post("/", addMovie);
router.get("/:title", getMovieByTitle);
router.get("/", getMovie);

module.exports = router;
