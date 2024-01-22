// @ts-nocheck - remove this comment!

import { Injectable } from '../../../index' // change import path to 'express-mod'

/**
 * Possible example base implement type.
 * @public
 */
export interface ExampleBaseImpl {
    helloWorldTxt: () => string
}

@Injectable()
export class ExampleBaseService implements ExampleBaseImpl {
    public helloWorld(): string {
        return 'Hello world!'
    }
}
