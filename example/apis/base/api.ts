// @ts-nocheck - remove this comment!

import { Api, Get } from '../../../index' // change import path to 'express-mod'
import { type ExampleBaseImpl, ExampleBaseService } from './service'

@Api('/base')
export class ExampleBaseApi implements ExampleBaseImpl {
    constructor(private readonly exampleBaseService: ExampleBaseService) {}

    @Get()
    public helloWorld(): string {
        return this.exampleBaseService.helloWorld()
    }
}
