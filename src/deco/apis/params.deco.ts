import { Store } from "../../services/store.service";
import {
  MetadataKeys,
  ParameterIndices,
  ApiMethodParams,
} from "../../utils/types";

/**
 * A named URL segments that are used to capture the values specified at their position in the URL factory.
 *
 * @param type parameter index.
 * @returns
 */
function PARAMS_DECORATOR_FACTORY(type: ParameterIndices): Function {
  return (name?: string): ParameterDecorator => {
    return (Target, propertyKey, index) => {
      // here we check does api method param metadata exist or not?.
      const paramsMetadata: ApiMethodParams[] = Store.container.has(
        Target.constructor.prototype,
        MetadataKeys.__api_method_params__,
        propertyKey,
      )
        ? // if it does exist we will get it from there.
          Store.container.getOwn<ApiMethodParams[]>(
            Target.constructor.prototype,
            MetadataKeys.__api_method_params__,
            propertyKey,
          )
        : // if it does not exist set it to an empty array.
          [];

      // push each object property into the head variable.
      // why do we need to do this?
      // because sometime a class has multiple methods.
      paramsMetadata.push({
        type,
        name,
        index,
        propertyKey,
      });

      // define a new metadata object and set it up in the container Store.
      Store.container.define<ApiMethodParams[]>(
        Target.constructor.prototype,
        paramsMetadata,
        MetadataKeys.__api_method_params__,
        propertyKey,
      );
    };
  };
}

/**
 * Express's `request`.
 *
 * @example [health(@Req() req: Request)]
 */
export const Req = PARAMS_DECORATOR_FACTORY(ParameterIndices.REQUEST);

/**
 * Express's `response`.
 *
 * @example [health(@Res() res: Response)]
 */
export const Res = PARAMS_DECORATOR_FACTORY(ParameterIndices.RESPONSE);

/**
 * Express's `next function`.
 *
 * @example [health(@Next() next: NextFunction)]
 */
export const Next = PARAMS_DECORATOR_FACTORY(ParameterIndices.NEXT);

/**
 * Express's `request params`.
 *
 * @example [health(@Params() params: object)]
 */
export const Params = PARAMS_DECORATOR_FACTORY(ParameterIndices.PARAMS);

/**
 * Express's `request query`.
 *
 * @example [health(@Query() query: object)]
 */
export const Query = PARAMS_DECORATOR_FACTORY(ParameterIndices.QUERY);

/**
 * Express's `request body`.
 *
 * @example [health(@Body() body: object)]
 */
export const Body = PARAMS_DECORATOR_FACTORY(ParameterIndices.BODY);

/**
 * Express's `request cookies`.
 *
 * @example [health(@Cookies() cookies: object)]
 */
export const Cookies = PARAMS_DECORATOR_FACTORY(ParameterIndices.COOKIES);

/**
 * Express's `request headers`.
 *
 * @example [health(@Headers() headers: object)]
 */
export const Headers = PARAMS_DECORATOR_FACTORY(ParameterIndices.HEADERS);

/**
 * Express's `request`.
 *
 * @example [health(@Ctx('user') user: object)]
 */
export const Ctx = PARAMS_DECORATOR_FACTORY(ParameterIndices.CONTEXT);
