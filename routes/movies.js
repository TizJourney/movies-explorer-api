const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();

const controller = require('../controllers/movies');

router.get('/movies', controller.getMovies);
router.post('/movies',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().uri(),
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
