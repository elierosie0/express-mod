import { Readable } from "stream";
import { NonSafe } from "./types";
import { ServerResponse } from "http";

/**
 * The function `isReadableStream` checks if a given object is an instance of the `Readable` class.
 * @param {NonSafe} result - The `result` parameter is of type `NonSafe`.
 * @returns a boolean value.
 */
export function isReadableStream(result: NonSafe): result is Readable {
  return result instanceof Readable;
}

/**
 * The function `isPromise` checks if a given value is a Promise.
 * @param {NonSafe} result - The `result` parameter is the value that we want to check if it is a
 * Promise or not.
 * @returns a boolean value. It returns true if the input `result` is an instance of the `Promise`
 * class, and false otherwise.
 */
export function isPromise<T = unknown>(result: NonSafe): result is Promise<T> {
  return result instanceof Promise;
}

/**
 * The function `isServerResponse` checks if a given result is an instance of the `ServerResponse`
 * class.
 * @param {NonSafe} result - The `result` parameter is of type `NonSafe`.
 * @returns a boolean value.
 */
export function isServerResponse(result: NonSafe): result is ServerResponse {
  return result instanceof ServerResponse;
}
