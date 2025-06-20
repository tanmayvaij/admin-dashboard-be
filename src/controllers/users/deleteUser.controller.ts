import { Request, Response } from "express";
import { prisma } from "../../database";
import { createLog } from "../../utils";

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });

    if (!user) {
      await createLog({
        action: "USER_DELETED",
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

    const deletedUser = await prisma.user.delete({ where: { id: user.id } });

    await createLog({
      action: "USER_DELETED",
      actorId: req.user.id ?? null,
      target: deletedUser.id,
      statusCode: 201,
      ipAddress: req.ip ?? null,
      userAgent: req.headers["user-agent"] ?? null,
      errorMessage: null,
    });

    const { password, ...rest } = user;

    res.status(200).json({
      message: "User deleted",
      user: rest,
    });
  } catch (err) {
    await createLog({
      action: "USER_DELETED",
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
