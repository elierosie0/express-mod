import { NextFunction, Request, Response } from 'express'
import { NonSafe, ParameterIndices, ApiMethodParams } from '../../utils/types'

/**
 * No docs description yet.
 *
 * @param req express `request`.
 * @param res express `response`.
 * @param next express `next function`.
 * @returns
 */
export function extractParams(req: Request, res: Response, next: NextFunction): Function {
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

        return args // return args.
    }
}

/**
 * No docs yet.
 *
 * @param paramType parameter type.
 * @param name request name.
 * @returns
 */
function getParam(paramType: NonSafe, name?: string): string {
    return name ? paramType[name] : paramType
}
