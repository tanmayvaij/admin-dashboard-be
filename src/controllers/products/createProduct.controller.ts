import { Request, Response } from "express";

import { prisma } from "../../database";
import { createLog } from "../../utils";

export const createProductController = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.email,
        description: req.body.description,
        price: req.body.price,
      },
    });

    await createLog({
      action: "PRODUCT_CREATED",
      actorId: req.user.id ?? null,
      target: product.id,
      statusCode: 201,
      ipAddress: req.ip ?? null,
      userAgent: req.headers["user-agent"] ?? null,
      errorMessage: null,
    });

    res.status(201).json({
      message: "Product Created",
      product,
    });
  } catch (err) {
    await createLog({
      action: "PRODUCT_CREATED",
      actorId: req.user.id ?? null,
      target: null,
      statusCode: 500,
      ipAddress: req.ip ?? null,
      userAgent: req.headers["user-agent"] ?? null,
      errorMessage: JSON.stringify(err),
    });

    res.status(500).json({ errorMessage: err });
  }
};
