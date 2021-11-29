const Movie = require('../models/movie');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const addUserMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    movieId,
    thumbnail: req.body.image.formats.thumbnail.url,
    owner: req.user._id,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('400 — Переданы некорректные данные при создании карточки'));
      } else { next(err); }
    });
};

const deleteUserMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new Error('NotValidId'))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.findByIdAndRemove(req.params.movieId)
          .orFail(new Error('NotValidId'))
          .then((data) => res.send(data))
          .catch((err) => {
            if (err.message === 'NotValidId') {
              next(new NotFoundError('404 - Карточка с указанным _id не найдена'));
            }
            if (err.name === 'CastError') {
              next(new ValidationError('400 - _id карточки указан в неправильном формате'));
            } else { next(err); }
          });
      } else {
        next(new ForbiddenError('403 - Нет прав на удаление этой карточки'));
      }
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new NotFoundError('404 - Карточка с указанным _id не найдена'));
      }
      if (err.name === 'CastError') {
        next(new NotFoundError('404 - _id карточки указан в неправильном формате'));
      } else { next(err); }
    });
};

const getUserMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports = { addUserMovie, deleteUserMovie, getUserMovies };
