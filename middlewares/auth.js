const jwt = require('jsonwebtoken');
const errors = require('../utils/errors');

const { tokenKey } = require('../utils/token');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new errors.RequestError(errors.errorsContexts.loginError);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, tokenKey);
  } catch (err) {
    throw new errors.RequestError(errors.errorsContexts.loginError);
  }

  req.user = payload;

  next();
};
