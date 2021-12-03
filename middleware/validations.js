const { celebrate, Joi } = require('celebrate');

const regexp = /^[htps]{4,5}:\/\/(www\.)?([\w\W\d]{1,})(\.)([a-zA-Z]{1,})([\w\W\d]{1,})+$/mi;

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }),
});

const validateGetUser = celebrate({
  params: Joi.object().keys({
    userID: Joi.string().length(24).hex(),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateAddUserMovies = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(regexp).required(),
    trailer: Joi.string().regex(regexp).required(),
    thumbnail: Joi.string().regex(regexp).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateDeleteUserMovies = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateGetUser,
  validateUpdateUser,
  validateAddUserMovies,
  validateDeleteUserMovies,
};
