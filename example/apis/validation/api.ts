// @ts-nocheck - remove this comment!

import {
    Api,
    Get,
    Query,
    ValidateRequest,
    Validation,
} from '../../../dist/index.js' // change import path to 'express-mod'
import z from 'zod' // 👉: install zod

/**
 * Possible example validation api implement type.
 * @private
 */
interface ExampleValidationApiIml {
    getName: (name: string) => string
}

@Api('/validation')
export class ExampleValidationApi implements ExampleValidationApiIml {
    @Get()
    @Validation(
        z.object<ValidateRequest>({
            query: z.object({ name: z.string().max(5) }),
        }),
    )
    public getName(@Query('name') name: string): string {
        return name
    }
}
