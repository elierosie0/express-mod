// @ts-nocheck - remove this comment!

import { Api, Get, Inject } from '../../../dist/index.js' // change import path to 'express-mod'
import { ExampleBaseService } from './service'

/**
 * Possible example base api implement type.
 * @private
 */
interface ExampleBaseApiIml {
    helloWorld: () => string
}

@Api('/base')
export class ExampleBaseApi implements ExampleBaseApiIml {
    constructor(
        @Inject(ExampleBaseService)
        private readonly exampleBaseService: ExampleBaseService,
    ) {}

    @Get()
    public helloWorld(): string {
        return this.exampleBaseService.helloWorldTxt()
    }
}
