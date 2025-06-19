import { Router } from "express";

import { authRouter } from "./auth.route";
import { userRouter } from "./user.route";

export const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", userRouter);
