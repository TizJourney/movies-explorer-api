const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();

const controller = require('../controllers/movies');

router.get('/movies', controller.getMovies);
router.post('/movies',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required().min(1).max(30),
      director: Joi.string().required().min(1).max(30),
      duration: Joi.number().required().min(0),
      year: Joi.number().required().min(1900), // todo: убрать в переменную и в моделе тоже
      description: Joi.string().required().min(1),
      image: Joi.string().required().uri(),
      trailer: Joi.string().required().uri(),
      nameRU: Joi.string().required().min(1),
      nameEN: Joi.string().required().min(1),
      thumbnail: Joi.string().required().uri(),
      movieId: Joi.string().required().length(24),
    }),
  }),
  controller.createMovie);

router.delete('/movies/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24).required(),
    }),
  }),
  controller.deleteMovieById);

module.exports = router;
