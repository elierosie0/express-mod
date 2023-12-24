import { object, string } from 'zod'
import { Api, Get, Params, ValidateRequest, Validation } from '../index'
import { ExampleService } from './ex.sev'

@Api('/ex')
export class ExampleApi {
    constructor(private readonly exampleService: ExampleService) {}

    @Get('/:botName')
    @Validation(object<ValidateRequest>({ params: object({ botName: string() }) }))
    public helloWord(@Params('botName') botName: string) {
        return this.exampleService.helloWorld() + botName
    }
}

@Api('/ex2')
export class ExampleApi2 {
    constructor(private readonly exampleService: ExampleService) {}

    @Get()
    public helloWord(): string {
        return this.exampleService.helloWorld() + 'ex2'
    }
}
