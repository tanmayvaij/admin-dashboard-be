import { Request, Response } from "express";
import { prisma } from "../../database";
import { sign } from "jsonwebtoken";
import { createLog, sendTestEmail } from "../../utils";

export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      await createLog({
        action: "PASS_RESET_REQ",
        actorId: req.user.id ?? null,
        target: req.user.id,
        statusCode: 404,
        ipAddress: req.ip ?? null,
        userAgent: req.headers["user-agent"] ?? null,
        errorMessage: "User not found",
      });

      res.status(404).json({ errorMessage: "User not found" });
      return;
    }

    const token = sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });

    await prisma.user.update({
      where: { id: req.user.id },
      data: {
        resetToken: token,
      },
    });

    const resetUrl = `http://localhost:3000/reset-password?token=${token}`;

    await sendTestEmail(
      user.email,
      "Reset your password",
      `<p>Click here to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`
    );

    await createLog({
      action: "PASS_RESET_REQ",
      actorId: req.user.id ?? null,
      target: req.user.id,
      statusCode: 200,
      ipAddress: req.ip ?? null,
      userAgent: req.headers["user-agent"] ?? null,
      errorMessage: null,
    });

    res.status(200).json({ message: "Reset link sent (preview in console)" });
  } catch (err) {
    await createLog({
      action: "PASS_RESET_REQ",
      actorId: req.user.id ?? null,
      target: req.user.id,
      statusCode: 500,
      ipAddress: req.ip ?? null,
      userAgent: req.headers["user-agent"] ?? null,
      errorMessage: JSON.stringify(err),
    });

    res.status(500).json({ err });
  }
};
