import { Store } from '../../services/store.se'

/**
 * ...
 */
export function Injectable(): ClassDecorator {
    return (Target) => {
        // Define a new metadata object.
        Store.defineInjector(Target)
    }
}
