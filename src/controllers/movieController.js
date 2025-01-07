const Movie = require("../models/Movie");

const addMovie = async (req, res) => {
  try {
    const { title, releaseDate, genre, language, subtitle } = req.body;
    console.log(req.body)
    const movie = new Movie({title, releaseDate, genre, language, subtitle});
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports = { addMovie };
