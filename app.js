const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const celebrate = require('celebrate');
const helmet = require('helmet');

require('dotenv').config();

const userNotAuthRoutes = require('./routes/users-no-auth');
const userRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');

const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error');
const logger = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const cors = require('./middlewares/cors');

const errorTypes = require('./utils/errors');

const { PORT = 3001 } = process.env;

const app = express();

const { databaseAdress } = require('./utils/database');

mongoose.connect(databaseAdress, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());

app.use(limiter);
app.use(helmet());
app.use(cors);

app.use(logger.requestLogger);

app.use('/', userNotAuthRoutes);

app.use(auth);

app.use('/', userRoutes);
app.use('/', movieRoutes);

app.use(() => {
  throw new errorTypes.UrlNotFoundError('Несуществующий путь');
});

app.use(celebrate.errors());

app.use(logger.errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {});
