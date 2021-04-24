const jwt = require('jsonwebtoken');
const errorTypes = require('../utils/errors');

const { tokenKey } = require('../utils/token');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new errorTypes.LoginError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, tokenKey);
  } catch (err) {
    throw new errorTypes.LoginError('Необходима авторизация');
  }

  req.user = payload;

  next();
};
