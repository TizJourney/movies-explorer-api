const Card = require('../models/movie');
const { parseError, LoginError, NotFoundError } = require('../utils/errors');

module.exports.createMovie = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

module.exports.getMovies = (req, res, next) => {
  Card.find({}).sort('-createdAt')
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      parseError(err);
    })
    .catch(next);
};

module.exports.deleteMovieById = (req, res, next) => {
  Card.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError(`Карточка с ${req.params.id} не найдена`);
    })
    .then((data) => {
      if (data.owner._id !== req.user._id) {
        throw new LoginError('Недостаточно прав для удаления карточки');
      }
    })
    .then(() => Card.findByIdAndRemove(req.params.id))
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};
