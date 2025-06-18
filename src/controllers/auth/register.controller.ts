import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { hash, genSalt } from "bcrypt";
import { sign } from "jsonwebtoken";

import { prisma } from "../../database";
import { PrismaClientKnownRequestError } from "../../../generated/prisma/runtime/library";

export const registerController = async (req: Request, res: Response) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    res.status(400).json(error.mapped());
    return;
  }

  try {
    const createdUser = await prisma.user.create({
      data: {
        email: req.body.email,
        password: await hash(req.body.password, await genSalt(12)),
        role: req.body.role,
      },
    });

    const token = sign(
      { id: createdUser.id, email: createdUser.email, role: createdUser.role },
      process.env.JWT_SECRET!
    );

    res.status(201).json({ token });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === "P2002") {
      res
        .status(409)
        .json({ errorMessage: "User with given email already exists" });
      return;
    }

    res.status(500).json(err);
  }
};
