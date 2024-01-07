import express, { Router } from '../dist/index.js' // change import path to 'express-mod'

import { ExampleRoute } from './ex.rou'

// initialize express
const app = express()

// router instance
const router = new Router({ initial: app })

// attach and register decorated route.
router.attach('/api/v1', [ExampleRoute])

async function __main__() {
    // listen for connections
    app.listen(4000, () =>
        console.log('Server is up! visit: http://localhost:4000'),
    )
}

// execute main
__main__()
