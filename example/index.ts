import express, { Router } from '../index' // change import path to 'express-mod'
import http from 'node:http'

import { ExampleBaseRoute } from './apis/base/route'
import { ExampleValidationRoute } from './apis/validation/route'

// initialize express
const app = express()

// create http server
const server = http.createServer(app)

// router instance
const router = new Router({ initial: app })

// attach and register decorated route.
router.attach('/api/v1', [ExampleBaseRoute, ExampleValidationRoute])

async function __main__() {
    // listen for connections
    server.listen(4000, '0.0.0.0', () => console.info(`⚡️ Server is up in ${process.env.NODE_ENV} mode. visit: http://localhost:${process.env.PORT}`))
}

// execute main
__main__()
