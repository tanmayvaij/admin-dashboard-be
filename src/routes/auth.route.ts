import { Router } from "express";

import {
  loginController,
  verifyController,
  requestPasswordReset,
  resetPassword,
} from "../controllers/auth";
import { tokenCheck, validateRequestBody } from "../middlewares";
import {
  userSchemaValidator,
  resetPasswordRequestSchemaValidator,
  resetPasswordSchemaValidator,
} from "../validators";

export const authRouter = Router();

authRouter
  .route("/login")
  .post(
    ...validateRequestBody(userSchemaValidator),
    userSchemaValidator,
    loginController
  );

authRouter.route("/verify").get(tokenCheck, verifyController);

authRouter
  .route("/request-password-reset")
  .post(
    tokenCheck,
    ...validateRequestBody(resetPasswordRequestSchemaValidator),
    requestPasswordReset
  );

authRouter
  .route("/reset-password")
  .post(
    tokenCheck,
    ...validateRequestBody(resetPasswordSchemaValidator),
    resetPassword
  );
