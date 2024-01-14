// @ts-nocheck - remove this comment!

import { Injectable } from '../../../dist/index.js' // change import path to 'express-mod'

/**
 * Possible example base api implement type.
 * @private
 */
interface ExampleBaseApiIml {
    helloWorldTxt: () => string
}

@Injectable()
export class ExampleBaseService implements ExampleBaseApiIml {
    public helloWorldTxt(): string {
        return 'Hello world!'
    }
}
