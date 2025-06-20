import { Request, Response } from "express";
import { prisma } from "../../database";
import { createLog } from "../../utils";

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

    await createLog({
      action: "PRODUCT_UPDATED",
      actorId: req.user.id ?? null,
      target: req.params.id,
      statusCode: 200,
      ipAddress: req.ip ?? null,
      userAgent: req.headers["user-agent"] ?? null,
      errorMessage: null,
    });
    res.status(200).json({ message: "Product updated", updatedProduct });
  } catch (err) {
    await createLog({
      action: "PRODUCT_UPDATED",
      actorId: req.user.id ?? null,
      target: req.params.id,
      statusCode: 500,
      ipAddress: req.ip ?? null,
      userAgent: req.headers["user-agent"] ?? null,
      errorMessage: JSON.stringify(err),
    });
    res.status(500).json({ err });
  }
};
