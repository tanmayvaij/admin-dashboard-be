import { Request, Response } from "express";
import { prisma } from "../../database";

export const updateProductController = async (req: Request, res: Response) => {
  const updates = req.body;

  delete updates.id;
  delete updates.createdAt;
  delete updates.updatedAt;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: req.params.id },
      data: updates,
    });
    res.json({ message: "Product updated", updatedProduct });
  } catch (err) {
    res.status(500).json({ err });
  }
};
