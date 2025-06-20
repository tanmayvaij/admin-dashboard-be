import { Request, Response } from "express";
import { prisma } from "../../database";
import { createLog } from "../../utils";

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });

    if (!product) {
      await createLog({
        action: "PRODUCT_DELETED",
        actorId: req.user.id ?? null,
        target: req.params.id,
        statusCode: 404,
        ipAddress: req.ip ?? null,
        userAgent: req.headers["user-agent"] ?? null,
        errorMessage: "Product not found",
      });
      res.status(404).json({ errorMessage: "Product not found" });
      return;
    }

    await prisma.product.delete({ where: { id: product.id } });

    await createLog({
      action: "PRODUCT_DELETED",
      actorId: req.user.id ?? null,
      target: req.params.id,
      statusCode: 200,
      ipAddress: req.ip ?? null,
      userAgent: req.headers["user-agent"] ?? null,
      errorMessage: null,
    });

    res.status(200).json({
      message: "Product deleted",
      product,
    });
  } catch (err) {
    await createLog({
      action: "PRODUCT_DELETED",
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
