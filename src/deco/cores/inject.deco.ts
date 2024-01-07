import { Store } from '../../services/store.service'
import { core } from '../../utils/types'

/**
 * Inject func
 */
export function Inject(Injectable: core.Injectable): Function {
    return (Target: Function, _propertyKey: string | symbol, index: number) => {
        // define a new metadata object.
        Store.defineInjector(Target, { Injectable, index })
    }
}
