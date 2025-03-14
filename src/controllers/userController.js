const User = require("../models/User");
const Movie = require("../models/Movie");

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const newUser = new User({ name, email, password, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User Deleted Succesfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addWordToKnownWords = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.known_words.push(req.body.word);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const removeWordFromKnownWords = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.known_words = user.known_words.filter(
      (word) => word !== req.body.word
    );
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addWordToLearningWords = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.learning_words.push(req.body.word);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const removeWordFromLearningWords = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.learning_words = user.learning_words.filter(
      (word) => word !== req.body.word
    );
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const calculateKnownWordsFromMovie = async (req, res) => {
  try {
    const { userId, movieId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    let knownWordsCount = 0;
    let totalWordsCount = 0;

    movie.subtitle.forEach((wordObj) => {
      totalWordsCount += wordObj.count;
      if (user.known_words.includes(wordObj.word)) {
        knownWordsCount += wordObj.count;
      }
    });

    const knownWordsPercentage = (knownWordsCount / totalWordsCount) * 100;

    res
      .status(200)
      .json({ knownWordsCount, totalWordsCount, knownWordsPercentage });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  addWordToKnownWords,
  removeWordFromKnownWords,
  addWordToLearningWords,
  removeWordFromLearningWords,
  calculateKnownWordsFromMovie, // Add the new function to the exports
};
