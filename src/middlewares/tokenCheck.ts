import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

export const tokenCheck = (req: Request, res: Response, next: NextFunction) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    res
      .status(401)
      .json({ errorMessage: "Unauthorized access, token not provided" });
    return;
  }

  const token = authHeaders.split(" ")[1];

  try {
    req.user = verify(token, process.env.JWT_SECRET!) as JwtPayload;
    next();
  } catch {
    res
      .status(401)
      .json({ errorMessage: "Unauthorized access, invalid token" });
  }
};
