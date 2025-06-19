import { NextFunction, Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";
import { RunnableValidationChains } from "express-validator/lib/middlewares/schema";

export const validateRequestBody = (
  schema: RunnableValidationChains<ValidationChain>
) => [
  schema,
  (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.status(400).json(error.mapped());
      return;
    }

    next();
  },
];
