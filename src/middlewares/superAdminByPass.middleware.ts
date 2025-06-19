import { NextFunction, Request, Response } from "express";

import { prisma } from "../database";

type middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Promise<void>;

export const superAdminByPass = (...middlewares: middleware[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if ((await prisma.user.count()) !== 0) {
      let i = 0;

      const run = () => {
        const middleware = middlewares[i++];
        if (!middleware) {
          next();
          return;
        }
        middleware(req, res, run);
      };
    }
    next();
  };
};
