/** Reflect metadata credential. */
import "reflect-metadata";

import { Reflector } from "../src/services/reflector.service";

class Example {}

describe("Reflector service", () => {
  it("set & get injector id", () => {
    // set injector id.
    Reflector.setInjectorId(Example);

    // get injector id.
    const id = Reflector.getInjectorId(Example);
    expect(id.name).toEqual("Example");
  });
});
