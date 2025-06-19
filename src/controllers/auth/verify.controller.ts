import { Request, Response } from "express";

export const verifyController = (req: Request, res: Response) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
};
