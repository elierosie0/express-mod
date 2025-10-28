// @ts-nocheck - remove this comment!

import { Injectable } from '../../../index' // change import path to 'express-mod'

@Injectable()
export class ExampleBaseService {
    public helloWorld(): string {
        return 'Hello world!'
    }
}
