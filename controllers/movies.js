const Movie = require('../models/movie');

const errors = require('../utils/errors');

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
      errors.parseMoviesError(err);
    })
    .catch(next);
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(() => {
      throw new errors.RequestError(errors.errorsContexts.notFoundError, `Фильм с id ${req.params.id} не найден`);
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new errors.RequestError(errors.errorsContexts.forbiddenError, `Фильм с id ${req.params.id} не найден`);
      }
      return movie.remove().then(() => res.send({ message: movie }));
    })
    .catch(next);
};
