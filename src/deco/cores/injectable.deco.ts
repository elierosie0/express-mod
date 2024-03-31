import { Store } from "../../services/store.service";

/**
 * Injectable func
 */
export function Injectable(): ClassDecorator {
  return (Target) => {
    // define a new metadata object.
    Store.defineInjector(Target);
  };
}
