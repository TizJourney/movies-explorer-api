const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { parseError, NotFoundError } = require('../utils/errors');

const { tokenKey } = require('../utils/token');

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((data) => {
      res.send({
        email: data.email, name: data.name,
      });
    })
    .catch((err) => {
      parseError(err);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        tokenKey,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id, { _id: 0 })
    .orFail(() => {
      throw new NotFoundError(`Пользователь c ${req.user._id} не найден`);
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      parseError(err);
    })
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
      select: { _id: 0 },
    },
  )
    .orFail(() => {
      throw new NotFoundError(`Пользователь c ${req.user._id} не найден`);
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      parseError(err);
    })
    .catch(next);
};
