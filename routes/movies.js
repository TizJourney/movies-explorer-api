const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();

const controller = require('../controllers/movies');

router.get('/movies', controller.getMovies);
router.post('/movies',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required().min(3),
      director: Joi.string().required().min(3),
      duration: Joi.number().required().min(0),
      year: Joi.string().required().min(0),
      description: Joi.string().required(),
      image: Joi.string().required().uri(),
      trailer: Joi.string().required().uri(),
      thumbnail: Joi.string().required().uri(),
      movieId: Joi.string().required(),
      nameRU: Joi.string().required().min(3),
      nameEN: Joi.string().required().min(3),
    }),
  }),
  controller.createMovie);

router.delete('/movies/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  controller.deleteMovieById);

module.exports = router;
