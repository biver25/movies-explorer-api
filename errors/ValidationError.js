class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.message = '400 — Переданы некорректные данные';
    this.statusCode = 400;
  }
}

module.exports = ValidationError;
