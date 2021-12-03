class PageNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PageNotFoundError';
    this.message = '404 - Страница не найдена';
    this.statusCode = 404;
  }
}

module.exports = PageNotFoundError;
