import { Injectable } from '../dist/index.js' // change import path to 'express-mod'

@Injectable()
export class ExampleService {
    public helloWorld(): string {
        return 'Hello world!'
    }
}
