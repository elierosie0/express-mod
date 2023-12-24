import { Readable } from 'stream'
import { NonSafe } from './types'
import { ServerResponse } from 'http'

/**
 * No docs description yet.
 *
 * @param result a result returned from a function.
 * @returns boolean
 */
export function isReadableStream(result: NonSafe): result is Readable {
    return result instanceof Readable
}

/**
 * No docs description yet.
 *
 * @param result a result returned from a function.
 * @returns boolean
 */
export function isPromise<T = unknown>(result: NonSafe): result is Promise<T> {
    return result instanceof Promise
}

/**
 * No docs description yet.
 *
 * @param result a result returned from a function.
 * @returns boolean
 */
export function isServerResponse(result: NonSafe): result is ServerResponse {
    return result instanceof ServerResponse
}
