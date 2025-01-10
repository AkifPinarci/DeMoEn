const Movie = require("../models/Movie");
const movieData = require("../../data/movieSubTitle/Das Boot(1981).json");

const addMovie = async (req, res) => {
  try {
    const { title, releaseDate, genre, language, subtitle } = req.body;
    console.log(title);
    const movie = new Movie({ title, releaseDate, genre, language, subtitle });
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports = { addMovie };
