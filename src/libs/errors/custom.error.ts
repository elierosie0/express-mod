/**
 * No docs description yet.
 */
export abstract class CustomError extends Error {
    public abstract readonly status: number
    public abstract readonly error: string

    constructor(public readonly message: string) {
        super(message)
        Object.setPrototypeOf(this, CustomError.prototype)
    }
}
