// @ts-nocheck - remove this comment!

import { Injectable } from "../../../index"; // change import path to 'express-mod'

/**
 * Possible example validation implement type.
 * @public
 */
export interface ExampleValidationImpl {
  getName: (name: string) => string;
}

@Injectable()
export class ExampleValidationService implements ExampleValidationImpl {
  // get name
  public getName(name: string): string {
    return name; // return name
  }
}
