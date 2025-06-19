import { Request, Response } from "express";
import { prisma } from "../../database";

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });

    if (!user) {
      res.status(404).json({ errorMessage: "User not found" });
      return;
    }

    await prisma.user.delete({ where: { id: user.id } });

    const { password, ...rest } = user;

    res.json({
      message: "User deleted",
      user: rest,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};
