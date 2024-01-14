import express, { Router } from '../dist/index.js' // change import path to 'express-mod'

import { ExampleBaseRoute } from './apis/base/route'
import { ExampleValidationRoute } from './apis/validation/route'

// initialize express
const app = express()

// router instance
const router = new Router({ initial: app })

// attach and register decorated route.
router.attach('/api/v1', [ExampleBaseRoute, ExampleValidationRoute])

async function __main__() {
    // listen for connections
    app.listen(4000, () =>
        console.log('Server is up! visit: http://localhost:4000'),
    )
}

// execute main
__main__()
