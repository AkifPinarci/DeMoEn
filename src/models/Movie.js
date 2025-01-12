const mongoose = require("mongoose");
const Word = require("../models/Word");
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  difficulty: {
    type: Number,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  subtitle: [
    {
      word: {
        type: String,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
      level: {
        type: String,
        required: true,
      },
    },
  ],
});
// movieSchema.pre("save", async function (next) {
//   const movie = this;
//   const subtitleWords = movie.subtitle;

//   for (let i = 0; i < subtitleWords.length; i++) {
//     const wordFromSubtitle = subtitleWords[i];
//     const word = await Word.findOne({ word: wordFromSubtitle });
//     console.log(word);
//     if (!word) {
//       // If the word does not exist, create a new Word document
//       const newWord = new Word({ word: word, meaning: "", level: "Unknown" });
//       await newWord.save();
//     }
//   }

//   next();
// });
const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
