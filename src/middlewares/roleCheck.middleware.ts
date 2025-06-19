import { NextFunction, Request, Response } from "express";

type Roles = "USER" | "MODERATOR" | "ADMIN";

export const roleCheck = (...roles: Roles[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ errorMessage: "Forbidden, insufficient rights" });
      return;
    }
    next();
  };
};
