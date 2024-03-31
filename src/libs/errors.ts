/* The code is defining an abstract class called `CustomError` that extends the built-in `Error` class
in TypeScript. */
export abstract class CustomError extends Error {
  public abstract readonly status: number;
  public abstract readonly error: string;

  constructor(public override readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

/* The `UnauthorizedError` class represents an error that occurs when a user is not authorized to
access a resource. */
export class UnauthorizedError extends CustomError {
  public readonly status = 401;
  public readonly error = "UNAUTHORIZED";

  constructor(public override readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

/* The NotFoundError class is a custom error class that represents a 404 Not Found error with an
associated error message. */
export class NotFoundError extends CustomError {
  public readonly status = 404;
  public readonly error = "NOT_FOUND";

  constructor(public override readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/* The `ConflictError` class is a custom error class that represents a conflict error with a status
code of 409 and an error code of 'CONFLICT'. */
export class ConflictError extends CustomError {
  public readonly status = 409;
  public readonly error = "CONFLICT";

  constructor(public override readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

/* The UnprocessableError class represents an error with a status code of 422 and an error code of
'UNPROCESSABLE_ENTITY'. */
export class UnprocessableError extends CustomError {
  public readonly status = 422;
  public readonly error = "UNPROCESSABLE_ENTITY";

  constructor(public override readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, UnprocessableError.prototype);
  }
}

/* The ForbiddenError class represents an error that occurs when a user is not authorized to access a
resource. */
export class ForbiddenError extends CustomError {
  public readonly status = 403;
  public readonly error = "FORBIDDEN";

  constructor(public override readonly message: string) {
    super(message);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}
