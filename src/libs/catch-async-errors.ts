import { NonSafe } from '../utils/types'

const Layer: Function = require('express/lib/router/layer')
const Router: Function = require('express/lib/router')

const last = (arr: NonSafe[] = []) => arr[arr.length - 1]
const noop = Function.prototype

type NewFn = { (...args: NonSafe[]): Function } & Function
type OldFn = { [x: string]: Function } & Function

/**
 * It takes an old function and a new function, and copies all the properties from the old function to
 * the new function
 * @param {OldFn} oldFn - The function you want to copy the properties from.
 * @param newFn - NewFn & { [x: string]: Function | undefined }
 * @returns A function that takes an old function and a new function and returns a new function.
 */
const copyFnProps = (oldFn: OldFn, newFn: NewFn & { [x: string]: Function | undefined }): NonSafe => {
    Object.keys(oldFn).forEach((key) => {
        newFn[key] = oldFn[key]
    })

    return newFn
}

/**
 * It takes a function and returns a new function that calls the old function and if the old function
 * returns a promise, it catches any errors and passes them to the callback
 * @param {OldFn} oldFn - The function to wrap
 * @returns A function that takes in a variable number of arguments and returns a function that takes
 * in a variable number of arguments.
 */
const wrap = (oldFn: OldFn): NonSafe => {
    const newFn = (...args: NonSafe[]) => {
        const result = oldFn.apply(this, args)
        const next = (args.length === 5 ? args[2] : last(args)) || noop

        if (result && result.catch) return result.catch((err: Error) => next(err))

        return result
    }

    Object.defineProperty(newFn, 'length', {
        value: oldFn.length,
        writable: false
    })

    return copyFnProps(oldFn, newFn as NonSafe)
}

/**
 * It patches the `param` function on the `Router` prototype to wrap the callback function in a
 * function that will catch any errors and pass them to the `next` function
 * @returns The original param function.
 */
function patchRouterParam(): void {
    const originalParam: Function = Router.prototype.constructor.param

    Router.prototype.constructor.param = function param(name: string, fn: OldFn) {
        fn = wrap(fn)
        return originalParam.call(this, name, fn)
    }
}

/* Creating a getter and setter for the `handle` property on the `Layer` prototype. */
Object.defineProperty(Layer.prototype, 'handle', {
    enumerable: true,
    get() {
        return this.__handle
    },
    set(fn) {
        fn = wrap(fn)
        this.__handle = fn
    }
})

/* Patching the `param` function on the `Router` prototype to wrap the callback function in a
function that will catch any errors and pass them to the `next` function. */
patchRouterParam()
