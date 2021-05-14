const errorsContexts = {
  urlNotFoundError: {
    status: 404,
    message: 'Несуществующий путь',
  },
  internalError: {
    status: 500,
    message: 'На сервере произошла ошибка',
  },
  notFoundError: {
    status: 404,
    message: 'Данные не найдены',
  },
  badRequestError: {
    status: 400,
    message: 'Неверный формат запроса',
  },
  conflictError: {
    status: 409,
    message: 'Конфликт с существующими данными',
  },
  loginError: {
    status: 401,
    message: 'Необходима авторизация',
  },
  forbiddenError: {
    status: 403,
    message: 'Недостаточно прав',
  },
};

class RequestError extends Error {
  constructor(context, message = '') {
    super(message || context.message);

    this.statusCode = context.status;
  }
}

const parseUsersError = (err) => {
  if (['CastError', 'ValidationError'].includes(err.name)) {
    throw new RequestError(errorsContexts.badRequestError, err.message);
  }

  if (err.name === 'MongoError' && err.code === 11000) {
    throw new RequestError(errorsContexts.conflictError, 'Такой email уже существует');
  }

  throw new RequestError(errorsContexts.internalError);
};

const parseMoviesError = (err) => {
  if (['CastError', 'ValidationError'].includes(err.name)) {
    throw new RequestError(errorsContexts.badRequestError, err.message);
  }

  if (err.name === 'MongoError' && err.code === 11000) {
    throw new RequestError(errorsContexts.conflictError, 'Такой фильм уже существует');
  }

  throw new RequestError(errorsContexts.internalError);
};

module.exports = {
  errorsContexts,
  RequestError,
  parseUsersError,
  parseMoviesError,
};
