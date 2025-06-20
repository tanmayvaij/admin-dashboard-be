import { Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { genSalt, hash } from "bcrypt";
import { prisma } from "../../database";
import { createLog } from "../../utils";

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const token = req.query.token as string;

    if (!token || !req.body.password) {
      await createLog({
        action: "RESET_PASS_ACTION",
        actorId: req.user.id ?? null,
        target: req.body.id,
        statusCode: 400,
        ipAddress: req.ip ?? null,
        userAgent: req.headers["user-agent"] ?? null,
        errorMessage: "Token and new password are required",
      });

      res.status(400).json({ message: "Token and new password are required" });
      return;
    }

    let payload: JwtPayload;
    try {
      payload = verify(token, process.env.JWT_SECRET!) as JwtPayload;
    } catch (err) {
      await createLog({
        action: "RESET_PASS_ACTION",
        actorId: req.user.id ?? null,
        target: req.body.id,
        statusCode: 400,
        ipAddress: req.ip ?? null,
        userAgent: req.headers["user-agent"] ?? null,
        errorMessage: "Invalid or expired token",
      });

      res.status(400).json({ errorMessage: "Invalid or expired token" });
      return;
    }

    const userId = payload.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.resetToken !== token) {
      await createLog({
        action: "RESET_PASS_ACTION",
        actorId: req.user.id ?? null,
        target: req.body.id,
        statusCode: 400,
        ipAddress: req.ip ?? null,
        userAgent: req.headers["user-agent"] ?? null,
        errorMessage: "Invalid or used token",
      });

      res.status(400).json({ errorMessage: "Invalid or used token" });
      return;
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        password: await hash(req.body.password, await genSalt(12)),
        resetToken: null,
      },
    });

    await createLog({
      action: "RESET_PASS_ACTION",
      actorId: req.user.id ?? null,
      target: req.body.id,
      statusCode: 200,
      ipAddress: req.ip ?? null,
      userAgent: req.headers["user-agent"] ?? null,
      errorMessage: "Password reset successfully",
    });

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    await createLog({
      action: "RESET_PASS_ACTION",
      actorId: req.user.id ?? null,
      target: req.body.id,
      statusCode: 200,
      ipAddress: req.ip ?? null,
      userAgent: req.headers["user-agent"] ?? null,
      errorMessage: JSON.stringify(err),
    });
    res.status(500).json({ err });
  }
};
