class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.message = '409 - Данный фильм уже существует';
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
