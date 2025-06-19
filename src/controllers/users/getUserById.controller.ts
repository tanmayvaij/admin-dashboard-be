import { Request, Response } from "express";
import { prisma } from "../../database";

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      omit: { password: true },
    });
    if (!user) {
      res.status(404).json({ errorMessage: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err });
  }
};
