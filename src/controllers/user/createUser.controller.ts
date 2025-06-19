import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { hash, genSalt } from "bcrypt";

import { prisma } from "../../database";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.status(400).json(error.mapped());
      return;
    }

    if (await prisma.user.findUnique({ where: { email: req.body.email } })) {
      res
        .status(409)
        .json({ errorMessage: "User with given email already exists" });
      return;
    }

    const createdUser = await prisma.user.create({
      data: {
        email: req.body.email,
        password: await hash(req.body.password, await genSalt(12)),
      },
    });

    const { password, ...rest } = createdUser;

    res.status(201).json({
      message: "User Created",
      user: rest,
    });
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
};
