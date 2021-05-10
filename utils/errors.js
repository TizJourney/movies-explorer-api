/* eslint-disable max-classes-per-file */

class UrlNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class InternalError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

class LoginError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

const parseUsersError = (err) => {
  if (['CastError', 'ValidationError'].includes(err.name)) {
    throw new BadRequestError(err.message);
  }

  if (err.name === 'MongoError' && err.code === 11000) {
    throw new ConflictError('Такой email уже существует');
  }

  throw new InternalError('На сервере произошла ошибка');
};

const parseMoviesError = (err) => {
  if (['CastError', 'ValidationError'].includes(err.name)) {
    throw new BadRequestError(err.message);
  }

  if (err.name === 'MongoError' && err.code === 11000) {
    throw new ConflictError('Такой фильм уже существует');
  }

  throw new InternalError('На сервере произошла ошибка');
};

module.exports = {
  parseUsersError,
  parseMoviesError,
  InternalError,
  BadRequestError,
  NotFoundError,
  UrlNotFoundError,
  LoginError,
};
