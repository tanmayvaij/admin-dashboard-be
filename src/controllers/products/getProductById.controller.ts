import { Request, Response } from "express";
import { prisma } from "../../database";

export const getProductByIdController = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });
    if (!product) {
      res.status(404).json({ errorMessage: "Product not found" });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ err });
  }
};
