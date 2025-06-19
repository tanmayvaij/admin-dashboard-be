import { Request, Response } from "express";
import { prisma } from "../../database";

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.user.findMany({ omit: { password: true } });
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({ err });
  }
};
