class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.message = '403 - Нет прав на удаление этого фильма';
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
