const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const app = express();
const {
  PORT = 3000,
  MONGO_SERVER = 'mongodb://localhost:27017/moviesdb',
} = process.env;
const cors = require('cors');
const helmet = require('helmet');
const limiter = require('./configuration/limiter');
const router = require('./routes/index');
const { createUser, login } = require('./controllers/users');
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errors');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middleware/logger');
const corsOptions = require('./configuration/cors');
const { validateCreateUser, validateLogin } = require('./middleware/validations');

mongoose.connect(MONGO_SERVER, {
  useNewUrlParser: true,
});

app.use('*', cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(limiter);
app.use(helmet());
app.use(requestLogger);
app.use(express.json());
app.post('/signup', validateCreateUser, createUser);
app.post('/signin', validateLogin, login);
app.use('/', auth, router);
app.all('*', () => {
  throw new NotFoundError('404 - Страница не найдена');
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
