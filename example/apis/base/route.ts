// @ts-nocheck - remove this comment!

import express, { Route } from '../../../dist/index.js' // change import path to 'express-mod'
import { ExampleBaseApi } from './api'

@Route([ExampleBaseApi], { router: express.Router() })
export class ExampleBaseRoute {}
