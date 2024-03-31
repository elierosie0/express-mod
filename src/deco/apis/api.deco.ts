import { Store } from "../../services/store.service";
import { MetadataKeys, Api, PathParams } from "../../utils/types";

/**
 * A class defined with methods for handling one or more requests.
 *
 * @param url url path.
 * @example [@Api() class Api {}]
 * @returns
 */
export function Api(url: PathParams = "/"): ClassDecorator {
  return (Target) => {
    // define a new metadata object and set it up in the container Store.
    Store.container.define<Api>(Target, { url }, MetadataKeys.__api__);
  };
}
