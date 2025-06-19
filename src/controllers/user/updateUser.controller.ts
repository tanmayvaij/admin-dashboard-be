import { hash } from "bcrypt";
import { Request, Response } from "express";
import { prisma } from "../../database";

export const updateUserController = async (req: Request, res: Response) => {
  const updates = req.body;
  if (updates.password) updates.password = await hash(updates.password, 12);

  try {
    const updatedUser = await prisma.user.update({
      where: { id: req.params.id },
      data: updates,
    });
    res.json({ message: "User updated", updatedUser });
  } catch (err) {
    res.status(500).json({ err });
  }
};
