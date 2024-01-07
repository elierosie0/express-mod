// @ts-nocheck - remove this comment!

import { Api, Get } from '../dist/index.js' // change import path to 'express-mod'
import { ExampleService } from './ex.sev'

@Api()
export class ExampleApi {
    constructor(private readonly exampleService: ExampleService) {}

    @Get()
    public helloWorld(): string {
        return this.exampleService.helloWorld()
    }
}
