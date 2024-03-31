// @ts-nocheck - remove this comment!

import express, { Route } from "../../../index"; // change import path to 'express-mod'
import { ExampleValidationApi } from "./api";

@Route([ExampleValidationApi], { router: express.Router() })
export class ExampleValidationRoute {}
