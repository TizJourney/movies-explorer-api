const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const controller = require('../controllers/users');

router.post('/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email({ minDomainSegments: 2 }),
      password: Joi.string().required().min(2).max(30),
    }),
  }),
  controller.login);
router.post('/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email({ minDomainSegments: 2 }),
      password: Joi.string().required().min(2).max(30),
      name: Joi.string().min(2).max(80),
      about: Joi.string().min(2).max(80),
      avatar: Joi.string().uri(),
    }),
  }),
  controller.createUser);

module.exports = router;
