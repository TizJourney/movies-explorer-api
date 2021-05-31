const mongoose = require('mongoose');

const { urlCheckRegexp } = require('../utils/url');

const userLinkDescription = {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'user',
  required: true,
};

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле country является обязательным'],
    minlength: 3,
  },
  director: {
    type: String,
    required: [true, 'Поле director является обязательным'],
    minlength: 3,
  },
  duration: {
    type: Number,
    required: [true, 'Поле duration является обязательным'],
    min: [0, 'Поле duration неотрициальное'],
  },
  year: {
    type: String,
    required: [true, 'Поле year является обязательным'],
  },
  description: {
    type: String,
    required: [true, 'Поле description является обязательным'],
  },
  image: {
    type: String,
    required: [true, 'Поле image является обязательным'],
    validate: {
      validator(v) {
        return urlCheckRegexp.test(v);
      },
      message: 'Не верный формат url\'а в поле image',
    },
  },
  trailer: {
    type: String,
    required: [true, 'Поле trailer является обязательным'],
    validate: {
      validator(v) {
        return urlCheckRegexp.test(v);
      },
      message: 'Не верный формат url\'а в поле trailer',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле thumbnail является обязательным'],
    validate: {
      validator(v) {
        return urlCheckRegexp.test(v);
      },
      message: 'Не верный формат url\'а в поле thumbnail',
    },
  },
  owner: userLinkDescription,
  movieId: {
    type: String,
  },
  nameRU: {
    type: String,
    required: [true, 'Поле nameRu является обязательным'],
    minlength: 3,
  },
  nameEN: {
    type: String,
    required: [true, 'Поле nameEN является обязательным'],
    minlength: 3,
  },
},
{
  versionKey: false,
});

movieSchema.index({ movieId: 1, owner: 1 }, { unique: true });

module.exports = mongoose.model('movie', movieSchema);
