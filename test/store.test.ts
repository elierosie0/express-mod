/** Reflect metadata credential. */
import 'reflect-metadata'

import { Store } from '../src/services/store.service'

class Example {}

describe('Store service', () => {
    it('define injector', () => {
        expect(Store.defineInjector(Example).name).toEqual('Example')
    })
})
