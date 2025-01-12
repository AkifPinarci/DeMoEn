const Movie = require("../models/Movie");
const oneMovie = require("../../data/movieSubTitle/4_Minutes_2006_DVDRip.srt.json");
const addMovie = async (req, res) => {
  try {
    const { title, difficulty, language, subtitle } = oneMovie;
    console.log(title);
    const movie = new Movie({ title, difficulty, language, subtitle });
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(404).json(err);
  }
};

const getMovie = async (req, res) => {
  try {
    const movies = await Movie.find().select("language releaseDate");
    res.status(200).json(movies);
  } catch (err) {
    res.status(404).json(err);
  }
};

const getMovieByTitle = async (req, res) => {
  const title = req.params.title;
  try {
    const foundMovie = await Movie.findOne({ title });
    res.status(200).json(foundMovie);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports = { addMovie, getMovieByTitle, getMovie };
