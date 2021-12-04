class EmailConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'EmailConflictError';
    this.message = '409 - Такой email уже существует';
    this.statusCode = 409;
  }
}

module.exports = EmailConflictError;
