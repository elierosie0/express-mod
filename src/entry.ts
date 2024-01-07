import { Store } from './services/store.service'
import {
    Constructable,
    MetadataKeys,
    Middleware,
    NonSafe,
    Route,
    Api,
    ApiMethod,
    ApiMethodParams,
    PathParams,
    core,
} from './utils/types'
import {
    Router as ExRouter,
    NextFunction,
    Request,
    Response,
    Express,
    RequestHandler,
} from 'express'
import { extractParams } from './libs/extract-params'
import { isPromise, isReadableStream, isServerResponse } from './utils/guards'
import { CustomError } from './libs/errors'
import { ThrowError } from './libs/throw-error'

/**
 * The `defineInjector` function is used to define an injector for a given target, allowing for
 * dependency injection in TypeScript.
 * @param {Function | Constructable} Target - The `Target` parameter is the function or constructable
 * class that you want to define an injector for. It is the target of the injection.
 * @param [inject] - The `inject` parameter is an optional object that contains two properties:
 */
export const defineInjector = (
    Target: Function | Constructable,
    inject?: {
        index: number
        Injectable: core.Injectable
    },
): Function | Constructable => Store.defineInjector(Target, inject)

export class Router {
    /**
     * @property `_app` express initialize
     */
    private readonly _app: Express

    /**
     * @param initial express initial
     */
    constructor({ initial }: { initial: Express }) {
        this._app = initial
    }

    /**
     * Attach and register application's decorated route.
     *
     * @param prefix prefix path.
     * @param Handlers route handlers.
     *
     * Possible signatures:
     * * `router.attach(prefix, [route, ...]) => void`
     */
    public attach<T = unknown>(prefix: PathParams, Handlers: T[]): void {
        const Routes = this.removeDuplicatedArr(Handlers) as Constructable[]

        Routes.forEach((Route) => {
            const routeMetadata: Route<T> = Store.container.get(
                Route,
                MetadataKeys.__route__,
            ) // parents
            const routeMidsMetadata: Middleware[] = Store.container.get(
                Route,
                MetadataKeys.__route_middleware__,
            ) // parents
            const Apis = this.removeDuplicatedArr(
                routeMetadata.Apis,
            ) as Constructable[]

            Apis.forEach((Api) => {
                // define injector
                defineInjector(Api)

                // router handler
                this.routerHandler(
                    prefix,
                    Api,
                    routeMidsMetadata,
                    routeMetadata.routeOptions.router,
                    this.getInstance,
                )
            })
        })

        // execute error handler.
        this.errorHandlers()
    }

    /**
     * Router handler
     *
     * @param prefix prefix path.
     * @param RouteApi route api handler.
     * @param router express.Router()
     * @param _getInstance get instance value.
     */
    private routerHandler(
        prefix: PathParams,
        Api: Constructable,
        routeMids: Middleware[],
        router: ExRouter,
        _getInstance: (api: Constructable) => Constructable,
    ): void {
        const apiRouteInstance: Constructable = _getInstance(Api)
        const apiRouteMethodNames: string[] = Object.getOwnPropertyNames(
            Object.getPrototypeOf(new Api()),
        ).filter((p) => p !== 'constructor')

        // metadata constance.
        const apiMetadata: Api | undefined = Store.container.get(
            Api,
            MetadataKeys.__api__,
        ) // parents

        // throw
        if (!apiMetadata)
            throw ThrowError('ApiError', 'No api found. use `@Api()` instead.')

        // url path logic
        const preUrlPath: PathParams = this.removeTrailingSlash(prefix)
        const apiUrlPath: PathParams = this.removeTrailingSlash(apiMetadata.url)

        apiRouteMethodNames.forEach((name) => {
            const apiMethodsMetadata: ApiMethod[] | undefined =
                Store.container.getOwn(
                    Api.prototype,
                    MetadataKeys.__api_method__,
                    name,
                ) // a child of apiMetadata.

            // throw
            if (!apiMethodsMetadata)
                throw ThrowError(
                    'ApiMethodError',
                    'No api method found. use `@Get()` or any http methods instead.',
                )

            apiMethodsMetadata.forEach((method) => {
                const apiMethodParamsMetadata: ApiMethodParams[] =
                    Store.container.getOwn(
                        Api.prototype,
                        MetadataKeys.__api_method_params__,
                        method.propertyKey,
                    ) // a child of apiMetadata.
                const apiMethodMidsMetadata: Middleware[] =
                    Store.container.getOwn(
                        Api.prototype,
                        MetadataKeys.__api_method_middleware__,
                        method.propertyKey,
                    ) // a child of apiMetadata.
                const apiMethodValidationMetadata: NonSafe =
                    Store.container.getOwn(
                        Api.prototype,
                        MetadataKeys.__api_method_validation__,
                        method.propertyKey,
                    ) // a child of apiMetadata.

                // url path logic.
                const methodUrlPath: PathParams = this.removeTrailingSlash(
                    method.url,
                )
                const routeUrlPath = `${apiUrlPath}${methodUrlPath}`

                // original declared Fn.
                const declaredFn = method.descriptor.value as Function

                // method logic.
                method.descriptor.value = function (
                    req: Request,
                    res: Response,
                    next: NextFunction,
                ): NonSafe {
                    // extract params as an arguments.
                    const args: NonSafe[] = extractParams(
                        req,
                        res,
                        next,
                    )(apiMethodParamsMetadata)

                    // apply custom arguments.
                    const result: NonSafe = declaredFn.apply(
                        apiRouteInstance,
                        args,
                    )

                    // apply response status.
                    res.status(method.status)

                    /**
                     * Custom response result.
                     *
                     * Possible signatures:
                     * return a general string, boolean, number, promise, oject, array.
                     * or a regular res.send()
                     */
                    if (isPromise(result)) {
                        return result
                            .then((value) => {
                                !res.headersSent && res.send(value)
                            })
                            .catch((err) => {
                                next(err)
                            })
                    } else if (isServerResponse(result)) {
                        return !res.headersSent && res.send(result)
                    } else if (result !== undefined) {
                        return !res.headersSent && res.send(result)
                    } else if (isReadableStream(result)) {
                        return result.pipe(res)
                    }

                    // return the custom argument's result.
                }

                // mids and validation constance.
                const mMids = this.removeDuplicatedArr(
                    apiMethodMidsMetadata,
                ) as Middleware[]
                const rMids = this.removeDuplicatedArr(
                    routeMids,
                ) as Middleware[]
                const validation = apiMethodValidationMetadata
                    ? this.validateResource(apiMethodValidationMetadata)
                    : []

                // inject route fn into the router provider.
                router[method.method](
                    routeUrlPath,
                    validation,
                    ...rMids,
                    ...mMids,
                    method.descriptor.value,
                )
            })
        })

        // register router.
        this._app.use(preUrlPath, router)
    }

    /**
     * Error handler
     */
    private errorHandlers(): void {
        // 404 handler.
        this._app.use((_req, res) => {
            res.status(404).send({
                status: 404,
                error: 'NOT_FOUND',
                message:
                    'The route you were looking for does not exist or has been removed.',
            })
        })

        // global handler
        this._app.use(
            (err: Error, _req: Request, res: Response, _next: NextFunction) => {
                // response logic
                if (err instanceof CustomError) {
                    res.status(err.status).send({
                        status: err.status,
                        error: err.error,
                        message: err.message,
                    })
                } else {
                    // log error on the backend side.
                    console.error(err.stack)

                    res.status(500).send({
                        status: 500,
                        error: 'INTERNAL_SERVER_ERROR',
                        message: 'Something bad just happened!',
                    })
                }
            },
        )
    }

    /**
     * Valid resource
     *
     * @param schema any object schema.
     * @returns
     */
    private validateResource(schema: NonSafe): RequestHandler {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                await schema.parseAsync({
                    body: req.body,
                    query: req.query,
                    params: req.params,
                })

                next()
            } catch (err) {
                if (err instanceof Error) {
                    res.status(422).send({
                        status: 422,
                        error: 'UNPROCESSABLE_ENTITY',
                        message:
                            `${(err as NonSafe)?.issues?.at(0)?.path.at(1)}: ${(
                                err as NonSafe
                            )?.issues?.at(0)?.message}` || 'Validation error.',
                    })
                } else {
                    res.status(422).send({
                        status: 422,
                        error: 'UNPROCESSABLE_ENTITY',
                        message: 'Validation error.',
                    })
                }
            }
        }
    }

    /**
     * Get instance
     *
     * @param Api
     * @returns
     */
    private getInstance(Api: Constructable): Constructable {
        try {
            return Injector.get(Api) as Constructable
        } catch (_) {
            return new Api() as Constructable
        }
    }

    /**
     * Remove trailing slash from a string.
     * Example: Sometimes a url contain unused slashes `/api/v1/users////`
     * This will be convert to this `/api/v1/users` to prevent route crashing.
     *
     * @param str
     * @returns
     */
    private removeTrailingSlash(path: PathParams): PathParams {
        if (typeof path === 'string') return path.replace(/\/+$/, String())
        return path
    }

    /**
     * Remove duplicated array.
     * Example: [1, 1, 2, 3] => [1, 2, 3]
     *
     * @returns
     */
    private removeDuplicatedArr(arr: unknown[]): unknown[] {
        return Array.from(new Set(arr))
    }
}

/**
 * A top-level class injector.
 */
export class Injector {
    /**
     * The function `get` retrieves an instance of a class from an injector.
     * @param Target - The `Target` parameter is a constructor function or class that you want to get
     * an instance of from the dependency injection container. It represents the type of object you
     * want to retrieve from the container.
     * @returns a value of type T, which is the resolved value from the injector.
     */
    public static get<T = unknown>(Target: Constructable<T>): T {
        // TODO
        const injector: core.Injector = Store.findInjector(Target)

        // throw
        if (!injector)
            throw new Error(
                'GetInjectorError: You are missing something or doing something incorrectly. Use @Injectable or @Inject instead.',
            )

        return this.resolveInjectorValue<T>(injector)
    }

    /**
     * The function resolves the value of an injector by recursively finding and resolving the
     * dependencies.
     * @param injector - The `injector` parameter is an instance of the `core.Injector` class. It
     * represents an injector that is responsible for resolving and providing dependencies for a
     * specific type.
     * @returns The injector value is being returned.
     */
    private static resolveInjectorValue<T>(injector: core.Injector): T {
        // check if injector value does exist then return them.
        if (injector.value) return injector.value as T

        // deps constance.
        const deps: core.Dependency[] = injector.deps.map((dep) => {
            const depInjector: core.Injector = Store.findInjector(dep.id)

            // throw
            if (!depInjector)
                throw new Error('DepInjectorError: An error occurred.')

            return this.resolveInjectorValue(depInjector)
        })

        // set injector value.
        injector.value = new injector.Type(...deps)

        return injector.value as T // return the injector value.
    }
}
