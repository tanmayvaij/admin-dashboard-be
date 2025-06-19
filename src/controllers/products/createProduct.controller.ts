import { Request, Response } from "express";

import { prisma } from "../../database";

export const createProductController = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.email,
        description: req.body.description,
        price: req.body.price,
      },
    });

    res.status(201).json({
      message: "Product Created",
      product,
    });
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
};
