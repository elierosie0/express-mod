# About

A flexible web framework for building fast API (Application programming interface) and maintainable.

> `express-mod` based on the [express](https://expressjs.com) web framework.

## Default Features ✨ What so special about express-mod?

-   Error handler such as 404 exception and global exception ✔
-   Catch async error on all routes ✔
-   `OOP` and `MVC` based routing or functionality are also supported ✔
-   Typescript support out of the box ✔
-   Route validation ✔

👉 Note: some of these features are optional. You can either use or not to use.

## Table of contents

-   [Example](#example)
    -   [Start the server](#start-the-server)
    -   [Register route](#register-route)
    -   [Routing with decorator](#routing-with-decorator)
    -   [Attach and register decorated route](#attach-and-register-decorated-route)
-   [Installation](#installation)
-   [Apis](#api)
    -   [@Api](#api)
    -   [@Method](#method)
    -   [@Middleware](#middleware)
    -   [@Params](#params)
    -   [@Validation](#validation)
    -   [@Route](#route)
    -   [@Injectable](#injectable)
    -   [@Inject](#inject)
    -   [@Injector](#injector)
-   [Router](#router)
-   [Customize](#customize)
    -   [Middleware](#customize-middleware)
    -   [Method](#customize-method)
    -   [Errors & Exceptions](#customize-errors-and-exceptions)
-   [Exception](#exception)
-   [Define injector](#define-injector)
-   [Using with Javascript](#using-with-js)
    -   [Start the server](#start-the-server-with-js)

<a href="#example"></a>

## Example

> Attention: Using `express-mod` with TypeScript projects is recommended. If you are using JavaScript [see this](#using-with-js).

<a href="#start-the-server"></a>

#### Start the server

`./server.ts`

```ts
import express from 'express-mod'

// initialize express
const app = express()

// listen for connections
app.listen(4000, () =>
    console.log('Server is up! visit: http://localhost:4000'),
)
```

<a href="#register-route"></a>

#### Register route

`./server.ts`

```ts
import express from 'express-mod'

// initialize express
const app = express()

// register route
app.get('/', (_req, res) => {
    res.status(200).send('OK')
}) // visit: http://localhost:4000 => OK

// listen for connections
app.listen(4000, () =>
    console.log('Server is up! visit: http://localhost:4000'),
)
```

<a href="#routing-with-decorator"></a>

#### Routing with decorator

`./ex.sev.ts`

```ts
import { Injectable } from 'express-mod'

@Injectable()
export class ExampleService {
    public helloWorld(): string {
        return 'Hello world!'
    }
}
```

`./ex.api.ts`

```ts
import { Api, Get } from 'express-mod'
import { ExampleService } from './ex.sev.ts'

@Api()
export class ExampleApi {
    constructor(private readonly exampleService: ExampleService) {}

    @Get()
    public helloWorld(): string {
        return this.exampleService.helloWorld()
    }
}
```

`./ex.rou.ts`

```ts
import express, { Route } from 'express-mod'
import { ExampleApi } from './ex.api.ts'

@Route([ExampleApi], { router: express.Router() })
export class ExampleRoute {}
```

<a href="#attach-and-register-decorated-route"></a>

#### Attach and register decorated route

`./server.ts`

```ts
import express, { Router } from 'express-mod'
import { ExampleRoute } from './ex.ro.ts'

// initialize express
const app = express()

// router instance
const router = new Router({ initial: app })

// attach and register decorated route.
router.attach('/api/v1', [ExampleRoute])

async function __main__() {
    // TODO: connect to database
    // await connect({ uri: 'DB_URI' })

    // listen for connections
    app.listen(4000, () =>
        console.log('Server is up! visit: http://localhost:4000'),
    )
}

// execute main
__main__()
```

<a href="#installation"></a>

## Installation

> You need nodeJs [installed](https://nodejs.org) on your OS.

```txt
# with npm
npm i express-mod

# installing typescript
1. npm i -D typescript - in this case I'm using npm.
2. npx tsc --init - to create tsconfig.json file.
```

As we all know, the library uses `@decorator` without enabling some additional features. Typescript will complain. You need to enable these additional features of Typescript. In the file
'tsconfig.json' enable these:

```json
{
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
}
```

That's it. well done! see [example](#example)

<a href="#apis"></a>

## Apis

We provide all the Apis that you will need to create a flexible and maintainable application.

<a href="#api"></a>

### @Api

A class defined with methods for handling one or more requests.

-   @param `url` url path.

Example

```ts
import { Api } from 'express-mod'

@Api()
export class ExampleApi {}
```

<a href="#method"></a>

### @Method

A specific endpoint for HTTP requests.

-   @param `method` http method type.
-   @param `url` url path.
-   @param `status` status code.

Possible methods

`@Get(), @Post(), @Put(), @Patch(), @Delete()`

Example

```ts
import { Get } from 'express-mod'

export class ExampleApi {
    @Get()
    public helloWorld(): string {
        return 'hello world!'
    }
}
```

<a href="#middleware"></a>

### @Middleware

A function which is called before the route handler.

-   @param `mids` execute any code.

Example

method middleware

```ts
import { Middleware } from 'express-mod'

export class ExampleApi {
    @Middleware([
        (req, res, next) => {
            console.log('mid mounted before route bound.')
            next()
        },
    ])
    public helloWorld(): string {
        return 'hello world!'
    }
}
```

Example

route middleware

```ts
import { Middleware } from 'express-mod'

@Middleware([
    (req, res, next) => {
        console.log('mid mounted before route bound.')
        next()
    },
])
export class ExampleRoute {}
```

<a href="#params"></a>

### @Params

A named URL segments that are used to capture the values specified at their position in the URL.

-   @param `name` request type.

Possible params

`@Req(), @Res(), @Next(), @Params(), @Query(), @Body(), @Cookies(), @Headers(), @Ctx()`

Example

```ts
import { Req, Request, Body } from 'express-mod'

export class ExampleApi {
    public helloWorld(@Req() req: Request, @Body() body: object): string {
        // `req.body` regular use.
        // instead of `req.body` use `@Body()` param => req.body
        return 'hello world!'
    }
}
```

<a href="#validation"></a>

### @Validation

Validation middleware. A function which is called before the route handler.

-   @param `schema` schema object.

Supported library: `zod`

> Note: With some libraries besides `zod` can also be integrated with routing validation, but you just have to set it up yourself. Our developers are working on it to put everything convenient.

Example

with `zod`

```ts
import { ValidateRequest, Validation } from 'express-mod'
import { object, string } from 'zod'

export class ExampleApi {
    @Validation(object<ValidateRequest>({ body: object({ name: string() }) }))
    public helloWorld(): string {
        return 'hello world!'
    }
}
```

<a href="#route"></a>

### @Route

No description provided.

-   @param `Apis` api handlers.
-   @param `routeOptions` route options.

Example

```ts
import express, { Route } from 'express-mod'

@Route([], { router: express.Router() })
export class ExampleRoute {}
```

<a href="#injectable"></a>

### @Injectable

The `@Injectable()` decorator is used to define metadata object.

Example

`./injectable.ts`

```ts
import { Injectable } from 'express-mod'

@Injectable()
export class ExampleService {
    public username(): string {
        return 'Bob'
    }
}
```

<a href="#inject"></a>

### @Inject

The `@Inject()` decorator is used to mark parameter as dependency.

Example

`./inject.ts`

```ts
import { Inject } from 'express-mod'
import { ExampleService } from './injectable'

export class Example {
    constructor(
        @Inject(ExampleService) private readonly exampleService: ExampleService,
    ) {}

    public getName(): string {
        return exampleService.username()
    } // returns "Bob"
}
```

<a href="#injector"></a>

### @Injector

A top-level class used to resolve injector value.

Example

`./injector.ts`

```ts
import { Injector } from 'express-mod'
import { Example } from './inject'

// resolve Example injector value.
const value = Injector.get(Example)
value.username() // Returns "Bob"
```

<a href="#customize"></a>

## Customize

You can customize some Apis according to your needs.

<a href="#customize-middleware"></a>

### Middleware

Most come with `middleware`. It has to be flexible. Sure, we got it!

Example

`./api.middleware.ts`

```ts
import { Middleware, UnauthorizedError } from 'express-mod'

// check if user is not log in.
const Authenticated = () =>
    Middleware([
        (req, res, next) => {
            if (req.isUnAuthenticated()) {
                throw new UnauthorizedError('User unauthorized.')
            }
        },
    ])

// example usage:
export class ExampleApi {
    @Authenticated()
    public helloWorld(): string {
        return 'hello world!'
    }
}
```

<a href="#customize-method"></a>

### Method

> In addition to the 5 common http methods `@Get(), @Post(), @Put(), @Patch(), @Delete()` that we provided, there are some other http methods such as `ALL, TRACE, HEAD, OPTIONS, etc.` that we didn't
> provided. you can customize it to your needs.

Example

`./api.method.ts`

```ts
import { METHOD_DECORATOR_FACTORY, PathParams } from 'express-mod'

// head http method
const Head = (url?: PathParams, status: number = 200) =>
    METHOD_DECORATOR_FACTORY('head', url, status)

// example usage:
export class ExampleApi {
    @Head()
    public helloWorld(): string {
        return 'hello world!'
    }
}
```

<a href="#customize-errors-and-exceptions"></a>

### Errors & Exceptions

Customize `response` error.

Example

`./errors.err.ts`

```ts
import { CustomError } from 'express-mod'

export class BadRequestError extends CustomError {
    public readonly status = 400
    public readonly error = 'BAD_REQUEST'

    constructor(public readonly message: string) {
        super(message)
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }
}

// example usage:
throw new BadRequestError('Any message.')
```

<a href="#router"></a>

## Router

The `Router` is a top-level class used to attach and register decorated route.

```ts
import express, { Router } from 'express-mod'

// initialize express
const app = express()

// router constance
const router = new Router({ initial: app })

// attach and register decorated route.
router.attach('/', [route, ...])
```

<a href="#exception"></a>

## Exception

No description provided.

-   @param `message` response message.

Possible errors

`CustomError(), UnauthorizedError(), NotFoundError(), ConflictError(), ValidationError(), ForbiddenError()`

Example

```ts
throw new ConflictError('User is already exist.')
```

<a href="#define-injector"></a>

## Define injector

The `defineInjector` function is used to define metadata object.

Example

```ts
import { defineInjector } from 'express-mod'

export class Example {}

// define injector
defineInjector(Example)
```

<a href="#using-with-js"></a>

## Using with Javascript

> Attention: Using `express-mod` with Javascript will gain less benefits. But you can still use it or consider using `express` instead.

<a href="#start-the-server-with-js"></a>

#### Start the server

> To start the server using `Javascript` (CommonJs) you have to make some changes.

`./server.js`

```ts
// CommonJs
const { expressFn } = require('express-mod')

// initialize express
const app = expressFn()

// listen for connections
app.listen(4000, () =>
    console.log('Server is up! visit: http://localhost:4000'),
)
```

#### Benefit

-   [Exception](#exception)

**express-mod** build everything Api (Application programming interface) lighter, easier and maintainable.
