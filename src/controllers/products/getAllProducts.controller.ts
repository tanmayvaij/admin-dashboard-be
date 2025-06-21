import { Request, Response } from "express";
import { prisma } from "../../database";
import { Prisma } from "../../../generated/prisma";

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || "";
    const skip = (page - 1) * limit;

    const filter = search
      ? {
          name: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        }
      : {};

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where: filter,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.product.count({
        where: filter,
      }),
    ]);

    res.status(200).json({
      message: "Products fetched successfully",
      page,
      limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      products,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};
