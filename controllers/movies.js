const Movie = require('../models/movie');
const ValidationError = require('../errors/ValidationError');
const IdValidationError = require('../errors/IdValidationError');
const MovieNotFoundError = require('../errors/MovieNotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const ConflictError = require('../errors/ConflictError');

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
    thumbnail,
  } = req.body;
  Movie.find({ movieId, owner: req.user._id })
    .then((data) => {
      if (data.length > 0) {
        next(new ConflictError());
      } else {
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
          thumbnail,
          owner: req.user._id,
        })
          .then((movie) => res.status(200).send(movie))
          .catch((err) => {
            if (err.name === 'ValidationError') {
              next(new ValidationError());
            } else { next(err); }
          });
      }
    })
    .catch(next);
};

const deleteUserMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(new Error('NotValidId'))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.findByIdAndRemove(req.params.id)
          .orFail(new Error('NotValidId'))
          .then((data) => res.send(data))
          .catch((err) => {
            if (err.message === 'NotValidId') {
              next(new MovieNotFoundError());
            } else { next(err); }
            // if (err.name === 'CastError') {
            //   next(new IdValidationError());
            // } else { next(err); }
          });
      } else {
        next(new ForbiddenError());
      }
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new MovieNotFoundError());
      }
      if (err.name === 'CastError') {
        next(new IdValidationError());
      } else { next(err); }
    });
};

const getUserMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

module.exports = { addUserMovie, deleteUserMovie, getUserMovies };
