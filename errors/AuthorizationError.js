class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthorizationError';
    this.message = '401 - Неправильные почта или пароль';
    this.statusCode = 401;
  }
}

module.exports = AuthorizationError;
