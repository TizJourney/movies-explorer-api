const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const controller = require('../controllers/users');

router.get('/users/me', controller.getUserInfo);

router.patch('/users/me',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().min(2).max(80),
      name: Joi.string().min(2).max(80),
    }),
  }),
  controller.updateUserInfo);

module.exports = router;
