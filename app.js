const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const celebrate = require('celebrate');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

require('dotenv').config();

// const userNotAuthRoutes = require('./routes/users-no-auth');
// const userRoutes = require('./routes/users');
// const cardRoutes = require('./routes/cards');

const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error');
const logger = require('./middlewares/logger');

const errorTypes = require('./utils/errors');

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const options = {
  origin: [
    'http://api.tizjourney-mesto.nomoredomains.club',
    'https://api.tizjourney-mesto.nomoredomains.club',
    'http://tizjourney-mesto.nomoredomains.club',
    'https://tizjourney-mesto.nomoredomains.club',
    'https://github.com/TizJourney',
    'http://localhost:3000',
    'https://localhost:3000',
  ],
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100,
});

app.use(bodyParser.json());

app.use(limiter);
app.use(helmet());
app.use(cors(options));

app.use(logger.requestLogger);

// app.use('/', userNotAuthRoutes);

app.use(auth);

// app.use('/', userRoutes);
// app.use('/', cardRoutes);

app.use(() => {
  throw new errorTypes.UrlNotFoundError('Несуществующий путь');
});

app.use(celebrate.errors());

app.use(logger.errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {});
