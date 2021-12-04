class NeedAuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NeedAuthorizationError';
    this.message = '401 - Необходима авторизация';
    this.statusCode = 401;
  }
}

module.exports = NeedAuthorizationError;
