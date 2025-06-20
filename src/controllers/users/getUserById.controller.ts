import { Request, Response } from "express";
import { prisma } from "../../database";
import { createLog } from "../../utils";

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      omit: { password: true },
    });
    if (!user) {
      await createLog({
        action: "GET_USER_BY_ID",
        actorId: req.user.id ?? null,
        target: req.params.id,
        statusCode: 404,
        ipAddress: req.ip ?? null,
        userAgent: req.headers["user-agent"] ?? null,
        errorMessage: "User not found",
      });

      res.status(404).json({ errorMessage: "User not found" });
      return;
    }

    await createLog({
      action: "GET_USER_BY_ID",
      actorId: req.user.id ?? null,
      target: req.params.id,
      statusCode: 200,
      ipAddress: req.ip ?? null,
      userAgent: req.headers["user-agent"] ?? null,
      errorMessage: null,
    });

    res.status(200).json(user);
  } catch (err) {
    await createLog({
      action: "GET_USER_BY_ID",
      actorId: req.user.id ?? null,
      target: req.params.id,
      statusCode: 500,
      ipAddress: req.ip ?? null,
      userAgent: req.headers["user-agent"] ?? null,
      errorMessage: JSON.stringify(err),
    });
    res.status(500).json({ err });
  }
};
