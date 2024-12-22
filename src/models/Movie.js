const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    releaseDate:{
        type: Date,
        required: true,
    },
    genre:{
        type: Array,
        required: true,
    },
    language:{
        type: String,
        required: true,
    },
    subtitle:[
        {
            words:{
                type: Array,
                required: true,
            },
            required: true,
        }
    ]
   
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;