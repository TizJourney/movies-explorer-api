const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const controller = require('../controllers/users');

router.get('/users/me', controller.getUserInfo);
router.get('/users', controller.getUsers);
router.get('/users/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24).required(),
    }),
  }),
  controller.getUsersById);

router.patch('/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(80),
      about: Joi.string().min(2).max(80),
    }),
  }),
  controller.updateProfile);
router.patch('/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().uri(),
    }),
  }),
  controller.updateAvatar);

module.exports = router;
