// @ts-nocheck - remove this comment!

import { Api, Get, Query, type ValidateRequest, Validation } from '../../../index' // change import path to 'express-mod'
import z from 'zod' // 👉: install zod
import { ExampleValidationService } from './service'

@Api('/validation')
export class ExampleValidationApi {
    constructor(private readonly exampleValidationService: ExampleValidationService) {}

    @Get()
    @Validation(
        z.object<ValidateRequest>({
            query: z.object({ name: z.string().max(5) }),
        })
    )
    public getName(@Query('name') name: string): string {
        return this.exampleValidationService.getName(name)
    }
}
