import { Constructable, MetadataKeys } from "../utils/types";

/* The `Container` class provides methods for defining, getting, and checking metadata on target
objects. */
export class Container {
  /**
   * Define a unique metadata value.
   *
   * @param target the target object on which to define metadata.
   * @param value a value that contains attached metadata.
   * @param key a key used to store and retrieve metadata.
   * @param propertyKey the property key for the target.
   */
  public define<T = unknown>(
    Target: Constructable | Function | Object,
    value: T,
    key: MetadataKeys | string,
    propertyKey?: string | symbol,
  ): void {
    // If propertyKey  is given.
    if (propertyKey) {
      // Define metadata with propertyKey .
      Reflect.defineMetadata(key, value, Target, propertyKey);
    }

    // Define metadata.
    Reflect.defineMetadata(key, value, Target);
  }

  /**
   * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
   *
   * @param target the target object on which the metadata is defined.
   * @param key a key used to store and retrieve metadata.
   * @param propertyKey the property key for the target.
   * @returns the metadata value for the metadata key if found; otherwise, undefined.
   */
  public get<T = unknown>(
    Target: Constructable | Function | Object,
    key: MetadataKeys | string,
    propertyKey?: string | symbol,
  ): T {
    // if propertyKey is given.
    if (propertyKey) {
      // Gets metadata with propertyKey.
      return Reflect.getMetadata(key, Target, propertyKey);
    }

    // Gets metadata.
    return Reflect.getMetadata(key, Target);
  }

  /**
   * Gets the metadata value for the provided metadata key on the target object.
   *
   * @param target the target object on which the metadata is defined.
   * @param key a key used to store and retrieve metadata.
   * @param propertyKey the property key for the target.
   * @returns the metadata value for the metadata key if found; otherwise, undefined.
   */
  public getOwn<T = unknown>(
    Target: Constructable | Function | Object,
    key: MetadataKeys | string,
    propertyKey?: string | symbol,
  ): T {
    // if propertyKey is given.
    if (propertyKey) {
      // Gets own metadata with propertyKey.
      return Reflect.getOwnMetadata(key, Target, propertyKey);
    }

    // Gets own metadata.
    return Reflect.getOwnMetadata(key, Target);
  }

  /**
   * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
   *
   * @param target the target object on which the metadata is defined.
   * @param key a key used to store and retrieve metadata.
   * @param propertyKey the property key for the target.
   * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
   */
  public has(
    Target: Constructable | Function | Object,
    key: MetadataKeys | string,
    propertyKey?: string | symbol,
  ): boolean {
    // If propertyKey is given.
    if (propertyKey) {
      // Check with propertyKey.
      return Reflect.hasMetadata(key, Target, propertyKey);
    }

    // Check without propertyKey.
    return Reflect.hasMetadata(key, Target);
  }
}
