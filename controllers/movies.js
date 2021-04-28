const Movie = require('../models/movie');
const { parseError, LoginError, NotFoundError } = require('../utils/errors');

module.exports.createMovie = (req, res, next) => {
  const { name, link } = req.body;

  Movie.create({ name, link, owner: req.user._id })
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      parseError(err);
    })
    .catch(next);
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError(`Фильм с ${req.params.id} не найден`);
    })
    .then((data) => {
      if (data.owner._id !== req.user._id) {
        throw new LoginError('Недостаточно прав для удаления фильма');
      }
    })
    .then(() => Movie.findByIdAndRemove(req.params.id))
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};
