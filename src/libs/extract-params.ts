import { NextFunction, Request, Response } from 'express'
import { NonSafe, ParameterIndices, ApiMethodParams } from '../utils/types'

/**
 * The function `extractParams` extracts parameters from a request object and returns them as an array.
 * @param {Request} req - The `req` parameter represents the HTTP request object.
 * @param {Response} res - The `res` parameter is an object representing the HTTP response that will be
 * sent back to the client. It contains methods and properties for manipulating the response, such as
 * setting headers, status code, and sending data back to the client.
 * @param {NextFunction} next - The `next` parameter is a function that is used to pass control to the
 * next middleware function in the request-response cycle. It is typically used to handle errors or to
 * move on to the next middleware function in the chain.
 * @returns The function `extractParams` returns a function that takes an array of `ApiMethodParams` as
 * an argument and returns an array of `NonSafe` values.
 */
export function extractParams(
    req: Request,
    res: Response,
    next: NextFunction,
): Function {
    return (params: ApiMethodParams[]): NonSafe[] => {
        // check if there is no params:
        // return the regular params [req, res, next]
        if (!params) return [req, res, next]

        // declared empty args array.
        const args: NonSafe[] = []

        // params logic.
        params.forEach(({ index, type, name }) => {
            switch (type) {
                case ParameterIndices.REQUEST:
                    args[index] = getParam(req, name)
                    break
                case ParameterIndices.RESPONSE:
                    args[index] = getParam(res, name)
                    break
                case ParameterIndices.NEXT:
                    args[index] = getParam(next, name)
                    break
                case ParameterIndices.PARAMS:
                    args[index] = getParam(req.params, name)
                    break
                case ParameterIndices.QUERY:
                    args[index] = getParam(req.query, name)
                    break
                case ParameterIndices.BODY:
                    args[index] = getParam(req.body, name)
                    break
                case ParameterIndices.COOKIES:
                    args[index] = getParam(req.cookies, name)
                    break
                case ParameterIndices.HEADERS:
                    args[index] = getParam(req.headers, name)
                    break
                case ParameterIndices.CONTEXT:
                    args[index] = getParam(req, name)
                    break
            }
        })

        return args // return args
    }
}

/**
 * The function `getParam` takes a parameter `paramType` of type `NonSafe` and an optional parameter
 * `name` of type `string`, and returns the value of `paramType` if `name` is not provided, otherwise
 * it returns the value of `paramType` at the specified `name` index.
 * @param {NonSafe} paramType - The `paramType` parameter is of type `NonSafe`.
 * @param {string} [name] - The `name` parameter is an optional parameter of type `string`.
 * @returns a string.
 */
function getParam(paramType: NonSafe, name?: string): string {
    return name ? paramType[name] : paramType
}
