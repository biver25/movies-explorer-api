class MovieNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MovieNotFoundError';
    this.message = '404 - Фильм с указанным _id не найден';
    this.statusCode = 404;
  }
}

module.exports = MovieNotFoundError;
