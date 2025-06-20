import { Request, Response } from "express";
import { createLog } from "../../utils";

export const verifyController = async (req: Request, res: Response) => {
  try {
    await createLog({
      action: "USER_VERIFIED",
      actorId: req.user.id ?? null,
      target: req.params.id,
      statusCode: 200,
      ipAddress: req.ip ?? null,
      userAgent: req.headers["user-agent"] ?? null,
      errorMessage: null,
    });

    res.status(200).json(req.user);
  } catch (err) {
    await createLog({
      action: "USER_VERIFIED",
      actorId: req.user.id ?? null,
      target: req.params.id,
      statusCode: 500,
      ipAddress: req.ip ?? null,
      userAgent: req.headers["user-agent"] ?? null,
      errorMessage: JSON.stringify(err),
    });

    res.status(500).json({ errorMessage: err });
  }
};
