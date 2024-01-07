import express, { Route } from '../dist/index.js' // change import path to 'express-mod'
import { ExampleApi } from './ex.api'

@Route([ExampleApi], { router: express.Router() })
export class ExampleRoute {}
