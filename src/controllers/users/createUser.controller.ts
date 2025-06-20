import { Request, Response } from "express";
import { hash, genSalt } from "bcrypt";

import { prisma } from "../../database";
import { createLog } from "../../utils";

export const createUserController = async (req: Request, res: Response) => {
  try {
    if (await prisma.user.findUnique({ where: { email: req.body.email } })) {
      await createLog({
        action: "USER_CREATED",
        actorId: req.user?.id ?? null,
        target: null,
        statusCode: 409,
        ipAddress: req.ip ?? null,
        userAgent: req.headers["user-agent"] ?? null,
        errorMessage: "User with given email already exists",
      });

      res
        .status(409)
        .json({ errorMessage: "User with given email already exists" });
      return;
    }

    const createdUser = await prisma.user.create({
      data: {
        email: req.body.email,
        password: await hash(req.body.password, await genSalt(12)),
        role: req.body?.role ?? "USER",
      },
    });

    await createLog({
      action: "USER_CREATED",
      actorId: req.user?.id ?? null,
      target: createdUser.id,
      statusCode: 201,
      ipAddress: req.ip ?? null,
      userAgent: req.headers["user-agent"] ?? null,
      errorMessage: null,
    });

    const { password, ...rest } = createdUser;

    res.status(201).json({
      message: "User Created",
      user: rest,
    });
  } catch (err) {
    await createLog({
      action: "USER_CREATED",
      actorId: req.user?.id ?? null,
      target: null,
      statusCode: 500,
      ipAddress: req.ip ?? null,
      userAgent: req.headers["user-agent"] ?? null,
      errorMessage: JSON.stringify(err),
    });

    res.status(500).json({ errorMessage: err });
  }
};
