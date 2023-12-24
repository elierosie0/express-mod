import { Container } from './container.se'
import { Constructable, MetadataKeys, core } from '../utils/types'
import { InjectorToken } from '../libs/injector-token'
import { Reflector } from '../services/reflector.se'

export class Store {
    /**
     * @property `injectors` injector store providers.
     */
    private static injectors: core.Injector[] = []
    /**
     * @property `container` class instance.
     */
    public static container: Container = new Container()

    /**
     * ...
     */
    public static defineInjector(
        Target: Constructable | Function,
        inject?: {
            index: number
            Injectable: core.Injectable
        }
    ): Constructable | Function {
        // Injector & paramTypes variables.
        let injector: core.Injector = this.findInjector(Target)
        const paramTypes = this.container.get(Target, MetadataKeys.__paramtypes__) as Constructable[] | undefined

        // If there is no injector will create one.
        if (!injector) injector = this.createInjector(Target)

        // Injectable.
        if (!inject) {
            paramTypes?.forEach((param, i) => {
                if (!injector.deps[i]) {
                    injector.deps[i] = { id: this.injectorId(param) }
                }
            })

            return Target // Return the target.
        }

        // Inject.
        injector.deps[inject.index] = {
            id: this.injectorId(inject.Injectable)
        }

        return Target // Return the target.
    }

    /**
     * ...
     */
    public static findInjector(Injectable: core.Injectable): core.Injector {
        const id: core.InjectableId = this.injectorId(Injectable)

        return this.injectors.find((injector) => injector.id === id) as core.Injector
    }

    /**
     * ...
     */
    private static injectorId(Injectable: core.Injectable): core.InjectableId {
        // NOTE: Check if injectable is an instanceof Token.
        // return a Token instance with the name property as an Id.
        if (Injectable instanceof InjectorToken) return Injectable

        // Otherwise return the class instance which is `Token instance with the name property` as an Id.
        return Reflector.getInjectorId(Injectable)
    }

    /**
     * ...
     */
    private static createInjector(Target: Constructable | Function): core.Injector {
        const id: core.InjectableId = Reflector.setInjectorId(Target)
        const injector: core.Injector = {
            id,
            Type: Target as Constructable,
            deps: []
        }

        // push values into injector.
        this.injectors.push(injector)

        return injector // return the injector.
    }
}
