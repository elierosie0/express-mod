/** Reflect metadata credential. */
import "reflect-metadata";

import { Container } from "../src/services/container.service";

const container = new Container();

class Example {}

describe("Container service", () => {
  container.define(Example, { test: "test" }, "define-and-get");

  it("define and get metadata", () => {
    const value = container.get<{ test: string }>(Example, "define-and-get");
    expect(value.test).toEqual("test");
  });

  it("define and get metadata err", () => {
    const value = container.get<{ test: string }>(
      Example,
      "define-and-get-err",
    );
    expect(value).toBeUndefined();
  });

  container.define(Example, { test: "test" }, "define-and-get-prop", "prop");

  it("define and get metadata with propertyKey", () => {
    const value = container.get<{ test: string }>(
      Example,
      "define-and-get-prop",
      "prop",
    );
    expect(value.test).toEqual("test");
  });

  it("define and get metadata with propertyKey err", () => {
    const value = container.get<{ test: string }>(
      Example,
      "define-and-get-prop",
      "prop-err",
    );
    expect(value).toBeUndefined();
  });

  container.define(Example, { test: "test" }, "define-and-getOwn");

  it("define and getOwn metadata", () => {
    const value = container.get<{ test: string }>(Example, "define-and-getOwn");
    expect(value.test).toEqual("test");
  });

  it("define and getOwn metadata err", () => {
    const value = container.get<{ test: string }>(
      Example,
      "define-and-getOwn-err",
    );
    expect(value).toBeUndefined();
  });

  container.define(Example, { test: "test" }, "define-and-getOwn-prop", "prop");

  it("define and getOwn metadata with propertyKey", () => {
    const value = container.get<{ test: string }>(
      Example,
      "define-and-getOwn-prop",
      "prop",
    );
    expect(value.test).toEqual("test");
  });

  it("define and getOwn metadata with propertyKey err", () => {
    const value = container.get<{ test: string }>(
      Example,
      "define-and-getOwn-prop",
      "prop-err",
    );
    expect(value).toBeUndefined();
  });

  it("has", () => {
    const value = container.has(Example, "define-and-get");
    expect(value).toBeTruthy();
  });

  it("has err", () => {
    const value = container.has(Example, "not-defined-key");
    expect(value).toBeFalsy();
  });

  it("has with propertyKey", () => {
    const value = container.has(Example, "define-and-getOwn-prop", "prop");
    expect(value).toBeTruthy();
  });

  it("has with propertyKey err", () => {
    const value = container.has(Example, "define-and-getOwn-prop", "prop-err");
    expect(value).toBeFalsy();
  });
});
