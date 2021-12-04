class IdValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'IdValidationError';
    this.message = '400 - _id указан в неправильном формате';
    this.statusCode = 400;
  }
}

module.exports = IdValidationError;
