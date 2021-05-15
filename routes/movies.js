const validatorTools = require('validator');

const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();

const controller = require('../controllers/movies');

const urlValidatorConstructor = (errorMessage) => (
  (value, helpers) => {
    if (validatorTools.isURL(value)) {
      return value;
    }
    return helpers.message(errorMessage);
  });

router.get('/movies', controller.getMovies);
router.post('/movies',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required().min(3),
      director: Joi.string().required().min(3),
      duration: Joi.number().required().min(0),
      year: Joi.string().required().min(0),
      description: Joi.string().required(),
      image: Joi.string().required().custom(urlValidatorConstructor('Некорректный формат поля image')),
      trailer: Joi.string().required().custom(urlValidatorConstructor('Некорректный формат поля trailer')),
      thumbnail: Joi.string().required().custom(urlValidatorConstructor('Некорректный формат поля thumbnail')),
      movieId: Joi.string().required(),
      nameRU: Joi.string().required().min(3),
      nameEN: Joi.string().required().min(3),
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
