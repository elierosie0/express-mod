import { Store } from '../../services/store.service'
import {
    HttpMethods,
    MetadataKeys,
    ApiMethod,
    PathParams,
} from '../../utils/types'

/**
 * A specific endpoint for HTTP requests factory.
 *
 * @param method http method type.
 * @param url url path.
 * @param status status code.
 * @returns
 */
export function METHOD_DECORATOR_FACTORY<M extends string>(
    method: M,
    url: PathParams = '/',
    status = 200,
): MethodDecorator {
    return (Target, propertyKey, descriptor) => {
        // here we check does api method metadata exist or not?.
        const apiMethodsMetadata: ApiMethod[] = Store.container.has(
            Target.constructor.prototype,
            MetadataKeys.__api_method__,
            propertyKey,
        )
            ? // if it does exist we will get it from there.
              Store.container.getOwn<ApiMethod[]>(
                  Target.constructor.prototype,
                  MetadataKeys.__api_method__,
                  propertyKey,
              )
            : // if it does not exist set it to an empty array.
              []

        // push each object property into the head variable.
        // why do we need to do this?
        // because sometime a class has multiple methods.
        apiMethodsMetadata.push({
            url,
            method: method as HttpMethods,
            status,
            descriptor,
            propertyKey,
        })

        // define a new metadata object and set it up in the container Store.
        Store.container.define<ApiMethod[]>(
            Target.constructor.prototype,
            apiMethodsMetadata,
            MetadataKeys.__api_method__,
            propertyKey,
        )
    }
}

/**
 * `get` http method.
 *
 * @example [@Get('/') public health() {}]
 */
export function Get(url?: PathParams): MethodDecorator
export function Get(status?: number): MethodDecorator
export function Get(url?: PathParams, status?: number): MethodDecorator
export function Get(arg1?: unknown, arg2?: unknown): unknown {
    const url = typeof arg1 === 'string' ? arg1 : '/'
    const status =
        typeof arg1 === 'number'
            ? arg1
            : undefined || typeof arg2 === 'number'
              ? arg2
              : undefined

    return METHOD_DECORATOR_FACTORY(HttpMethods.Get, url, status as number)
}

/**
 * `post` http method.
 *
 * @example [@Post('/') public health() {}]
 */
export function Post(url?: PathParams): MethodDecorator
export function Post(status?: number): MethodDecorator
export function Post(url?: PathParams, status?: number): MethodDecorator
export function Post(arg1?: unknown, arg2?: unknown): unknown {
    const url = typeof arg1 === 'string' ? arg1 : '/'
    const status =
        typeof arg1 === 'number'
            ? arg1
            : undefined || typeof arg2 === 'number'
              ? arg2
              : undefined

    return METHOD_DECORATOR_FACTORY(HttpMethods.Post, url, status as number)
}

/**
 * `put` http method.
 *
 * @example [@Put('/') public health() {}]
 */
export function Put(url?: PathParams): MethodDecorator
export function Put(status?: number): MethodDecorator
export function Put(url?: PathParams, status?: number): MethodDecorator
export function Put(arg1?: unknown, arg2?: unknown): unknown {
    const url = typeof arg1 === 'string' ? arg1 : '/'
    const status =
        typeof arg1 === 'number'
            ? arg1
            : undefined || typeof arg2 === 'number'
              ? arg2
              : undefined

    return METHOD_DECORATOR_FACTORY(HttpMethods.Put, url, status as number)
}

/**
 * `patch` http method.
 *
 * @example [@Patch('/') public health() {}]
 */
export function Patch(url?: PathParams): MethodDecorator
export function Patch(status?: number): MethodDecorator
export function Patch(url?: PathParams, status?: number): MethodDecorator
export function Patch(arg1?: unknown, arg2?: unknown): unknown {
    const url = typeof arg1 === 'string' ? arg1 : '/'
    const status =
        typeof arg1 === 'number'
            ? arg1
            : undefined || typeof arg2 === 'number'
              ? arg2
              : undefined

    return METHOD_DECORATOR_FACTORY(HttpMethods.Patch, url, status as number)
}

/**
 * `delete` http method.
 *
 * @example [@Delete('/') public health() {}]
 */
export function Delete(url?: PathParams): MethodDecorator
export function Delete(status?: number): MethodDecorator
export function Delete(url?: PathParams, status?: number): MethodDecorator
export function Delete(arg1?: unknown, arg2?: unknown): unknown {
    const url = typeof arg1 === 'string' ? arg1 : '/'
    const status =
        typeof arg1 === 'number'
            ? arg1
            : undefined || typeof arg2 === 'number'
              ? arg2
              : undefined

    return METHOD_DECORATOR_FACTORY(HttpMethods.Delete, url, status as number)
}
