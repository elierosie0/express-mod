import { CustomError } from './custom.error'

/** Export custom error. */
export * from './custom.error'

/**
 * No docs description yet.
 */
export class UnauthorizedError extends CustomError {
    public readonly status = 401
    public readonly error = 'UNAUTHORIZED'

    constructor(public readonly message: string) {
        super(message)
        Object.setPrototypeOf(this, UnauthorizedError.prototype)
    }
}

/**
 * No docs description yet.
 */
export class NotFoundError extends CustomError {
    public readonly status = 404
    public readonly error = 'NOT_FOUND'

    constructor(public readonly message: string) {
        super(message)
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }
}

/**
 * No docs description yet.
 */
export class ConflictError extends CustomError {
    public readonly status = 409
    public readonly error = 'CONFLICT'

    constructor(public readonly message: string) {
        super(message)
        Object.setPrototypeOf(this, ConflictError.prototype)
    }
}

/**
 * No docs description yet.
 */
export class UnprocessableError extends CustomError {
    public readonly status = 422
    public readonly error = 'UNPROCESSABLE_ENTITY'

    constructor(public readonly message: string) {
        super(message)
        Object.setPrototypeOf(this, UnprocessableError.prototype)
    }
}

/**
 * No docs description yet.
 */
export class ForbiddenError extends CustomError {
    public readonly status = 403
    public readonly error = 'FORBIDDEN'

    constructor(public readonly message: string) {
        super(message)
        Object.setPrototypeOf(this, ForbiddenError.prototype)
    }
}
