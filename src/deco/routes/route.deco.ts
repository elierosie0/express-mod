import { Store } from '../../services/store.service'
import { Router as ExRouter } from 'express'
import { Constructable, MetadataKeys, Route } from '../../utils/types'

/**
 * Route func
 *
 * @param Apis api handlers.
 * @param routeOptions route options.
 * @returns
 */
export function Route<T = unknown>(
    Apis: T[],
    routeOptions: { router: ExRouter },
): ClassDecorator {
    return (Target) => {
        // define a new metadata object and set it up in the container Store.
        Store.container.define<Route<T>>(
            Target,
            { Apis: Apis as Constructable<T>[], routeOptions },
            MetadataKeys.__route__,
        )
    }
}
