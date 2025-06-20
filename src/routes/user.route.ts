import { Router } from "express";

import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
} from "../controllers/users";
import { updateUserSchemaValidator, userSchemaValidator } from "../validators";
import {
  roleCheck,
  tokenCheck,
  validateRequestBody,
} from "../middlewares";

export const userRouter = Router();

userRouter
  .route("/")
  .post(
    tokenCheck,
    roleCheck("ADMIN"),
    ...validateRequestBody(userSchemaValidator),
    createUserController
  );

userRouter.use(tokenCheck);

userRouter
  .route("/")
  .get(roleCheck("ADMIN", "MODERATOR"), getAllUsersController);

userRouter
  .route("/:id")
  .get(roleCheck("ADMIN", "MODERATOR"), getUserByIdController)
  .put(
    roleCheck("ADMIN"),
    ...validateRequestBody(updateUserSchemaValidator),
    updateUserController
  )
  .delete(roleCheck("ADMIN"), deleteUserController);
