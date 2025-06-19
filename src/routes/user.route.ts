import { Router } from "express";

import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
} from "../controllers/user";
import { userSchemaValidator } from "../validators";
import { roleCheck, superAdminByPass, tokenCheck } from "../middlewares";

export const userRouter = Router();

userRouter.route("/").post(
  superAdminByPass(tokenCheck, roleCheck("ADMIN")),
  userSchemaValidator,
  createUserController
);

userRouter.use(tokenCheck);

userRouter
  .route("/")
  .get(roleCheck("ADMIN", "MODERATOR"), getAllUsersController);

userRouter
  .route("/:id")
  .get(roleCheck("ADMIN", "MODERATOR"), getUserByIdController)
  .put(roleCheck("ADMIN"), updateUserController)
  .delete(roleCheck("ADMIN"), deleteUserController);
