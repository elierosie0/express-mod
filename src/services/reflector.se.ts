import { Constructable, MetadataKeys } from '../utils/types'
import { InjectorToken } from '../libs/injector-token'
import { Store } from './store.se'

export class Reflector {
    /**
     * ...
     */
    public static setInjectorId(Target: Constructable | Function): InjectorToken {
        const id: InjectorToken = new InjectorToken(Target.name)

        // define a new metadata object and set it up in the container Store.
        Store.container.define<InjectorToken>(Target, id, MetadataKeys.__core_injectable__)

        return id // return the id.
    }

    /**
     * ...
     */
    public static getInjectorId(Target: Constructable): InjectorToken {
        return Store.container.get<InjectorToken>(Target, MetadataKeys.__core_injectable__)
    }
}
