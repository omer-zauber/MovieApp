const mongoose = require('mongoose');

const Movie = mongoose.model('Movie', {
  name: {
    type: String, 
    required: true,
    minlength: 1,
    trim: true,
    unique: true
  },
  genre: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  year: {
    type: Number,
    required: true
  },
  averageRating: {
    type: Number,
    required: true
  },
  numberOfRatings: {
    type: Number,
    default: 1
  }
});

module.exports = { Movie };