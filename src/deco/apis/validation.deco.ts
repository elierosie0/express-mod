import { Store } from '../../services/store.service'
import { MetadataKeys, NonSafe } from '../../utils/types'

/**
 * Validation middleware. A function which is called before the route handler.
 *
 * @param schema schema object.
 * @returns
 */
export function Validation(schema: NonSafe): MethodDecorator {
    return (Target, propertyKey) => {
        // define a new metadata object and set it up in the container Store.
        Store.container.define<NonSafe>(
            Target.constructor.prototype,
            schema,
            MetadataKeys.__api_method_validation__,
            propertyKey,
        )
    }
}
