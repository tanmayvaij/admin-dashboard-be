import { Request, Response } from "express";
import { prisma } from "../../database";

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });

    if (!product) {
      res.status(404).json({ errorMessage: "Product not found" });
      return;
    }

    await prisma.product.delete({ where: { id: product.id } });

    res.json({
      message: "Product deleted",
      product,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};
