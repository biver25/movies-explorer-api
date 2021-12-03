class UserNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UserNotFoundError';
    this.message = '404 - Пользователь по указанному _id не найден';
    this.statusCode = 404;
  }
}

module.exports = UserNotFoundError;
