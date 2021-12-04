const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    'слишком много запросов с этого IP, пожалуйста, попробуйте еще раз через 15 минут',
});

module.exports = limiter;
