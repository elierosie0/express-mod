/**
 * ...
 * @example [new Token<string>('ANY_STRING_TOKEN')]
 * @returns the injector token class instance.
 */
export class InjectorToken<T = unknown> {
    constructor(public name: T) {}
}
