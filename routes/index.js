const indexRouter = require('express').Router();

const userNotAuthRoutes = require('./users-no-auth');
const userRoutes = require('./users');
const movieRoutes = require('./movies');

const auth = require('../middlewares/auth');

const errors = require('../utils/errors');

indexRouter.use('/', userNotAuthRoutes);

indexRouter.use(auth);

indexRouter.use('/', userRoutes);
indexRouter.use('/', movieRoutes);

indexRouter.use(() => {
  throw new errors.RequestError(errors.errorsContexts.badRequestError);
});

module.exports = indexRouter;
