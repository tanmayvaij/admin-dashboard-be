import { Request, Response } from "express";
import { prisma } from "../../database";
import { createLog } from "../../utils";

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.user.findMany({ omit: { password: true } });

    await createLog({
      action: "GET_ALL_USERS",
      actorId: req.user.id ?? null,
      target: "ALL_USERS",
      statusCode: 200,
      ipAddress: req.ip ?? null,
      userAgent: req.headers["user-agent"] ?? null,
      errorMessage: null,
    });

    res.status(200).json(allUsers);
  } catch (err) {
    await createLog({
      action: "GET_ALL_USERS",
      actorId: req.user.id ?? null,
      target: "ALL_USERS",
      statusCode: 500,
      ipAddress: req.ip ?? null,
      userAgent: req.headers["user-agent"] ?? null,
      errorMessage: JSON.stringify(err),
    });

    res.status(500).json({ err });
  }
};
