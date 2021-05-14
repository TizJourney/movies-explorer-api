const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const celebrate = require('celebrate');
const helmet = require('helmet');

require('dotenv').config();

const errorHandler = require('./middlewares/error');
const logger = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const cors = require('./middlewares/cors');

const { PORT = 3001 } = process.env;

const indexRoutes = require('./routes/index');

const app = express();

const { databaseAdress } = require('./utils/database');

mongoose.connect(databaseAdress, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(logger.requestLogger);

app.use(bodyParser.json());

app.use(limiter);
app.use(helmet());
app.use(cors);

app.use(indexRoutes);

app.use(logger.errorLogger);

app.use(celebrate.errors());
app.use(errorHandler);

app.listen(PORT, () => {});
