import { Store } from '../../services/store.service'
import { MetadataKeys, Middleware, NonSafe } from '../../utils/types'

/**
 * A function which is called before the route handler factory.
 *
 * @param mids execute any code.
 * @param key metadata key.
 * @returns
 */
function MIDDLEWARE_DECORATOR_FACTORY(mids: Middleware[], key: MetadataKeys): Function {
    return (Target: Function | Object, propertyKey: string | symbol) => {
        // if typeof Target is an object.
        if (typeof Target === 'object') {
            // here we check does api method middleware metadata exist or not?.
            const apiMidsMetadata: Middleware[] = Store.container.has(Target.constructor.prototype, key, propertyKey)
                ? // if it does exist we will get it from there.
                  Store.container.getOwn<Middleware[]>(Target.constructor.prototype, key, propertyKey)
                : // if it does not exist set it to an empty array.
                  []

            // define a new metadata object and set it up in the container Store.
            Store.container.define<Middleware[]>(
                Target.constructor.prototype,
                mids.concat(apiMidsMetadata),
                key,
                propertyKey
            )
        }

        // if typeof Target is a function.
        // NOTE: isolated
        if (typeof Target === 'function') {
            // here we check does route middleware metadata exist or not?.
            const routeMidsMetadata: Middleware[] = Store.container.has(
                Target.constructor.prototype,
                MetadataKeys.__route_middleware__
            )
                ? // if it does exist we will get it from there.
                  Store.container.getOwn<Middleware[]>(Target.constructor.prototype, MetadataKeys.__route_middleware__)
                : // if it does not exist set it to an empty array.
                  []

            // define a new metadata object and set it up in the container Store.
            Store.container.define<Middleware[]>(
                Target.constructor.prototype,
                mids.concat(routeMidsMetadata),
                MetadataKeys.__route_middleware__
            )
        }
    }
}

/**
 * A function which is called before the route handler.
 *
 * @param mids execute any code
 * @returns
 */
export function Middleware(mids: Middleware[]): Function {
    return MIDDLEWARE_DECORATOR_FACTORY(mids, MetadataKeys.__api_method_middleware__)
}
