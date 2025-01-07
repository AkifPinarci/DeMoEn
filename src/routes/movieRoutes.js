const express = require("express");
const router = express.Router();
const { addMovie } = require("../controllers/movieController");

router.post("/", addMovie);

module.exports = router;
