import type { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";

import { AppError } from "../lib/app-error.js";

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      details: error.details ?? null
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "A unique value conflict occurred."
      });
    }
  }

  res.status(500).json({
    success: false,
    message: "Something went wrong on the server."
  });
}
