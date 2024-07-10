import { Response } from "express";

export const response = (
  res: Response,
  status: number,
  message: string,
  data: any = null
) => {
  return res.status(status).json({ message, data });
};
