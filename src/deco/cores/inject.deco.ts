import { Store } from '../../services/store.se'
import { core } from '../../utils/types'

/**
 * ...
 */
export function Inject(Injectable: core.Injectable): Function {
    return (Target: Function, _propertyKey: string | symbol, index: number) => {
        // Define a new metadata object.
        Store.defineInjector(Target, { Injectable, index })
    }
}
