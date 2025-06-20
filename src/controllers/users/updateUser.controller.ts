import { hash } from "bcrypt";
import { Request, Response } from "express";
import { prisma } from "../../database";
import { createLog } from "../../utils";

export const updateUserController = async (req: Request, res: Response) => {
  const updates = req.body;

  delete updates.id;
  delete updates.createdAt;
  delete updates.updatedAt;

  if (updates.password) updates.password = await hash(updates.password, 12);

  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.params.id },
      data: updates,
    });

    await createLog({
      action: "USER_UPDATED",
      actorId: req.user.id ?? null,
      target: req.params.id,
      statusCode: 200,
      ipAddress: req.ip ?? null,
      userAgent: req.headers["user-agent"] ?? null,
      errorMessage: null,
    });

    res.status(200).json({ message: "User updated", updatedUser });
  } catch (err) {
    await createLog({
      action: "USER_UPDATED",
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
