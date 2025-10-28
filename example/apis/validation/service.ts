// @ts-nocheck - remove this comment!

import { Injectable } from '../../../index' // change import path to 'express-mod'

@Injectable()
export class ExampleValidationService {
    // get name
    public getName(name: string): string {
        return name // return name
    }
}
