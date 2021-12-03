const jwt = require('jsonwebtoken');
const { randomString } = require('../controllers/users');
const NeedAuthorizationError = require('../errors/NeedAuthorizationError');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new NeedAuthorizationError());
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : randomString}`);
  } catch (err) {
    next(new NeedAuthorizationError());
  }
  req.user = payload;
  next();
};

module.exports = auth;
