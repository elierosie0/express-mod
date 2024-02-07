// @ts-nocheck - remove this comment!

import {
    Api,
    Get,
    Query,
    ValidateRequest,
    Validation,
    Inject,
} from '../../../index' // change import path to 'express-mod'
import z, { AnyZodObject } from 'zod' // 👉: install zod
import { type ExampleValidationImpl, ExampleValidationService } from './service'

@Api('/validation')
export class ExampleValidationApi implements ExampleValidationImpl {
    constructor(
        @Inject(ExampleValidationService)
        private readonly exampleValidationService: ExampleValidationService,
    ) {}

    @Get()
    @Validation<AnyZodObject>(
        z.object<ValidateRequest>({
            query: z.object({ name: z.string().max(5) }),
        }),
    )
    public getName(@Query('name') name: string): string {
        return this.exampleValidationService.getName(name)
    }
}
