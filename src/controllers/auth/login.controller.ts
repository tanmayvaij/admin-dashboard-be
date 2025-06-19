import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { prisma } from "../../database";

export const loginController = async (req: Request, res: Response) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      res.status(400).json(error.mapped());
      return;
    }

    const userFromDB = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (!userFromDB) {
      res.status(404).json({ errorMessage: "No such user exists" });
      return;
    }

    if (!(await compare(req.body.password, userFromDB.password))) {
      res.json({ errorMessage: "Invalid credentials" });
      return;
    }

    const token = sign(
      { id: userFromDB.id, email: userFromDB.email, role: userFromDB.role },
      process.env.JWT_SECRET!
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
};
