const Word = require("../models/Word");

const addWord = async (req, res) => {
  try {
    const { word, meaning, level } = req.body;
    const newWord = new Word({ word, meaning, level });
    await newWord.save();
    res.status(201).json(newWord);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getWordByWord = async (req, res) => {
  const word = req.params.word;
  try {
    const foundWord = await Word.findOne({ word });

    if (!foundWord) {
      return res.status(404).json({ message: "Word not found" });
    }

    return res.status(200).json(foundWord);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

const getWordsByLevel = async (req, res) => {
  const level = req.params.level;
  try {
    const foundWords = await Word.find({ level });

    if (foundWords.length === 0) {
      return res.status(404).json({ message: "No words found for this level" });
    }

    return res.status(200).json(foundWords);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { addWord, getWordByWord, getWordsByLevel };
