const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    known_words:{
        type: Array,
        required: true,
    },
    learning_words:{
        type: Array,
        required: true,
    },
    ignored_words:{
        type: Array,
        required: true,
    },
    watched_movies:{
        type: Array,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;