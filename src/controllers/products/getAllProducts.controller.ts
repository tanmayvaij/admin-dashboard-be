import { Request, Response } from "express";
import { prisma } from "../../database";

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ err });
  }
};
