/** Reflect metadata credential */
import "reflect-metadata";

import express from "express";
import "./src/libs/catch-async-errors";

/** Export everything from src. */
export * from "./src";

/**
 * Creates an Express application.
 * The express() function is a top-level function exported by the express module.
 */
export default express as typeof express;
// Commonjs
export const expressFn = express as typeof express;
