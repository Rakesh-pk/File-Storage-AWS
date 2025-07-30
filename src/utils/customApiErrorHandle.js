class ApiError extends Error {
  constructor(statusCode, message, stack = "") {
    super(message);
    this.statusCode = statusCode;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

   toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}

export default ApiError;
