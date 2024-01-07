/**
 * The Token class is a generic class in TypeScript that represents a token with a name property.
 * @example [new Token<string>('ANY_STRING_TOKEN')]
 */
export class Token<T = unknown> {
    constructor(public name: T) {}
}
