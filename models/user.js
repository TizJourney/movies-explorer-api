const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const validatorTools = require('validator');

const errors = require('../utils/errors');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле email является обязательным'],
    unique: true,
    validate: {
      validator(v) {
        return validatorTools.isEmail(v);
      },
      message: 'Неверный формат поле email',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле password является обязательным'],
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Поле name является обязательным'],
    minlength: 2,
    maxlength: 30,
  },
},
{
  versionKey: false,
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new errors.RequestError(errors.errorsContexts.loginError, 'Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new errors.RequestError(errors.errorsContexts.loginError, 'Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
