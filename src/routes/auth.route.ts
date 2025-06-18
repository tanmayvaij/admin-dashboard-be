import { Router } from "express";

import {
  registerController,
  loginController,
  verifyController,
} from "../controllers/auth";
import { tokenCheck } from "../middlewares";
import { userSchemaValidator } from "../validators";

export const authRouter = Router();

authRouter.route("/register").post(userSchemaValidator, registerController);
authRouter.route("/login").post(userSchemaValidator, loginController);
authRouter.route("/verify").get(tokenCheck, verifyController);
