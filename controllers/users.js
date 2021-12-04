const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const ValidationError = require('../errors/ValidationError');
const UserNotFoundError = require('../errors/UserNotFoundError');
const EmailConflictError = require('../errors/EmailConflictError');
const AuthorizationError = require('../errors/AuthorizationError');

const { NODE_ENV, JWT_SECRET } = process.env;
const randomString = '75de6743e283d9d0b5d5cc41cac0e7c5';

const getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new Error('NotValidId'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new UserNotFoundError());
      } else { next(err); }
    });
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser && foundUser._id !== req.user._id) {
        throw new EmailConflictError();
      }
      User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
        .orFail(new UserNotFoundError())
        .then((user) => res.send({ data: user }))
        .catch((err) => {
          // if (err.name === 'CastError') {
          //   next(new ValidationError('400 - _id пользователя указан в неправильном формате'));
          //   return;
          // }
          if (err.name === 'ValidationError') {
            next(new ValidationError());
          } else { next(err); }
        });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then(res.status(200).send({
      data: {
        email,
        name,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError());
        return;
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        next(new EmailConflictError());
      } else { next(err); }
    });
};

const login = (req, res, next) => {
  User.findOne({ email: req.body.email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthorizationError();
      }
      return bcrypt.compare(req.body.password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthorizationError();
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : randomString,
            { expiresIn: '7d' },
          );
          res.send({ token });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getUserMe,
  updateUser,
  createUser,
  login,
  randomString,
};
