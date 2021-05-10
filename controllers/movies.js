const Movie = require('../models/movie');

const {
  parseMoviesError,
  NotFoundError,
  ForbiddenError,
} = require('../utils/errors');

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailer, nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      parseMoviesError(err);
    })
    .catch(next);
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findOne({ movieId: req.params.id })
    .orFail(() => {
      throw new NotFoundError(`Фильм с id ${req.params.id} не найден`);
    })
    .then((data) => {
      if (data.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Недостаточно прав для удаления фильма');
      }
    })
    .then(() => Movie.findOneAndRemove({ movieId: req.params.id }))
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};
