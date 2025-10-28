import { Constructable, MetadataKeys } from '../utils/types'
import { Token } from '../libs/token'
import { Store } from './store.service'

/* The `Reflector` class provides methods to set and retrieve injector IDs for target objects in a
container store. */
export class Reflector {
    /**
     * The function `setInjectorId` sets a unique identifier for a given target in a container store.
     * @param {Constructable | Function} Target - The `Target` parameter is a constructor function or a
     * class that represents the target object that will be injected with dependencies. It can be
     * either a constructable function or a regular function.
     * @returns the id, which is an instance of the Token class.
     */
    public static setInjectorId(Target: Constructable | Function): Token {
        const id: Token = new Token(Target.name)

        // define a new metadata object and set it up in the container Store.
        Store.container.define<Token>(Target, id, MetadataKeys.__core_injectable__)

        return id // return the id.
    }

    /**
     * The function "getInjectorId" returns the injector ID for a given target.
     * @param {Constructable} Target - The `Target` parameter is a constructor function or class that
     * represents the target object for which we want to retrieve the injector ID.
     * @returns a Token.
     */
    public static getInjectorId(Target: Constructable): Token {
        return Store.container.get<Token>(Target, MetadataKeys.__core_injectable__)
    }
}
