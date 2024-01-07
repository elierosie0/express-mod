import { Container } from './container.service'
import { Constructable, MetadataKeys, core } from '../utils/types'
import { Token } from '../libs/token'
import { Reflector } from './reflector.service'

/* The `Store` class in TypeScript is used to define and manage injectors for dependency injection. */
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
     * The `defineInjector` function in TypeScript is used to define an injector for a given target,
     * with the option to specify injection parameters.
     * @param {Constructable | Function} Target - The `Target` parameter is a constructable function or
     * class that represents the target object for dependency injection. It can be either a function or
     * a class constructor.
     * @param [inject] - The `inject` parameter is an optional object that contains two properties:
     * @returns the `Target` parameter, which can be either a `Constructable` or a `Function`.
     */
    public static defineInjector(
        Target: Constructable | Function,
        inject?: {
            index: number
            Injectable: core.Injectable
        },
    ): Constructable | Function {
        // injector & paramTypes variables.
        let injector: core.Injector = this.findInjector(Target)
        const paramTypes: Constructable[] | undefined = this.container.get(
            Target,
            MetadataKeys.__paramtypes__,
        )

        // if there is no injector will create one.
        if (!injector) injector = this.createInjector(Target)

        // injectable
        if (!inject) {
            paramTypes?.forEach((param, i) => {
                if (!injector.deps[i]) {
                    injector.deps[i] = { id: this.injectorId(param) }
                }
            })

            return Target // Return the target.
        }

        // Inject
        injector.deps[inject.index] = {
            id: this.injectorId(inject.Injectable),
        }

        return Target // Return the target.
    }

    /**
     * The function "findInjector" returns the injector with the specified InjectableId from a list of
     * injectors.
     * @param Injectable - The `Injectable` parameter is of type `core.Injectable`, which represents a
     * class or value that can be injected into other classes or components. It is used to identify the
     * injector that provides the dependencies for the given `Injectable`.
     * @returns The method is returning an instance of `core.Injector`.
     */
    public static findInjector(Injectable: core.Injectable): core.Injector {
        const id: core.InjectableId = this.injectorId(Injectable)
        return this.injectors.find(
            (injector) => injector.id === id,
        ) as core.Injector
    }

    /**
     * The function `injectorId` returns an identifier for an injectable class or token.
     * @param Injectable - The `Injectable` parameter is a class or a token that represents a
     * dependency that can be injected into other classes. It can be either a class instance or a token
     * instance.
     * @returns either a Token instance with the name property as an Id if the Injectable is an
     * instance of Token, or it is returning the class instance which is a Token instance with the name
     * property as an Id if the Injectable is not an instance of Token.
     */
    private static injectorId(Injectable: core.Injectable): core.InjectableId {
        // NOTE: check if injectable is an instanceof Token.
        // return a Token instance with the name property as an Id.
        if (Injectable instanceof Token) return Injectable

        // otherwise return the class instance which is `Token instance with the name property` as an Id.
        return Reflector.getInjectorId(Injectable)
    }

    /**
     * The function creates an injector object with an ID, type, and an empty array of dependencies,
     * and adds it to an array of injectors.
     * @param {Constructable | Function} Target - The `Target` parameter is a constructor function or a
     * class that will be used as the target for dependency injection. It can be any function or class
     * that you want to create an injector for.
     * @returns the created injector object.
     */
    private static createInjector(
        Target: Constructable | Function,
    ): core.Injector {
        const id: core.InjectableId = Reflector.setInjectorId(Target)
        const injector: core.Injector = {
            id,
            Type: Target as Constructable,
            deps: [],
        }

        // push values into injector.
        this.injectors.push(injector)

        return injector // return the injector.
    }
}
