import { RequestHandler, Router as ExRouter } from 'express'
import { Token } from '../libs/token'

/**
 * NonSafe type is `any` type.
 * @public
 */
export type NonSafe = any // Any type

/**
 * Generic type for class definitions.
 * @public
 */
export type Constructable<T = unknown> = new (...args: NonSafe[]) => T

/**
 * Possible metadata key.
 * @public
 */
export enum MetadataKeys {
    __api__ = 'key:__api__',
    __api_method__ = 'key:__api_method__',
    __api_method_middleware__ = 'key:__api_method_middleware__',
    __api_method_params__ = 'key:__api_method_params__',
    __api_method_validation__ = 'key:__api_method_validation__',
    __route__ = 'key:__route__',
    __route_middleware__ = 'key:__route_middleware__',
    __core_injectable__ = 'key:__core_injectable__',
    // emitDecoratorMetadata's generated key: design:paramtypes.
    __paramtypes__ = 'design:paramtypes',
}

/**
 * Possible http method.
 * @public
 */
export enum HttpMethods {
    Get = 'get',
    Post = 'post',
    Put = 'put',
    Patch = 'patch',
    Delete = 'delete',
}

/**
 * Possible parameter index.
 * @public
 */
export enum ParameterIndices {
    REQUEST,
    RESPONSE,
    PARAMS,
    BODY,
    QUERY,
    HEADERS,
    COOKIES,
    NEXT,
    CONTEXT,
}

/**
 * Possible path params type.
 * @public
 */
export type PathParams = string | RegExp | Array<string | RegExp>

/**
 * Possible api type.
 * @public
 */
export interface Api {
    /**
     * Url path. the parents url path.
     * @readonly
     */
    readonly url: PathParams
}

/**
 * Possible api method type.
 * @public
 */
export interface ApiMethod {
    /**
     * Http method
     * @readonly
     */
    readonly method: HttpMethods
    /**
     * Url path
     * @readonly
     */
    readonly url: PathParams
    /**
     * Status code
     * @readonly
     */
    readonly status: number
    /**
     * Method key or name
     * @readonly
     */
    readonly propertyKey: string | symbol
    /**
     * Method value
     * @readonly
     */
    readonly descriptor: PropertyDescriptor
}

/**
 * Possible middleware type.
 * @public
 *
 */
export type Middleware = RequestHandler

/**
 * Possible api method params type.
 * @public
 *
 */
export interface ApiMethodParams {
    /**
     * Parameter index type
     * @readonly
     */
    readonly type: ParameterIndices
    /**
     * Parameter name
     * @readonly
     */
    readonly name?: string
    /**
     * Parameter index
     * @readonly
     */
    readonly index: number
    /**
     * Method key or name
     * @readonly
     */
    readonly propertyKey: string | symbol | undefined
}

/**
 * Possible route type.
 * @public
 *
 */
export interface Route {
    /**
     * Api handler
     * @readonly
     */
    readonly Apis: Constructable[]
    /**
     * Route options
     * @readonly
     */
    readonly routeOptions: { router: ExRouter }
}

/**
 * Possible validate request type.
 * @public
 */
export type ValidateRequest<B = NonSafe, Q = NonSafe, P = NonSafe> = {
    body?: B
    query?: Q
    params?: P
}

/**
 * Core types wrapper.
 * @public
 */
export namespace core {
    /**
     * Possible injectable types.
     * @exports
     */
    export type Injectable<T = unknown, S = unknown> = Constructable<T> | Token<S>
    /**
     * Possible injectable id type.
     * @exports
     */
    export type InjectableId<S = unknown> = Token<S>
    /**
     * Possible injectable dependency types.
     * @exports
     */
    export interface Dependency<S = unknown> {
        id: InjectableId<S>
    }
    /**
     * Possible injector types.
     * @exports
     */
    export interface Injector<T = unknown, S = unknown> {
        id: InjectableId<S>
        Type: Constructable<T>
        deps: Dependency<S>[]
        value?: unknown
    }
}
