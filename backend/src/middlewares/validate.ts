import type { NextFunction, Request, Response } from "express";
import type { ZodError, ZodTypeAny } from "zod";

import { AppError } from "../lib/app-error.js";

export function validate(schema: ZodTypeAny) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const parsed = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query
    });

    if (!parsed.success) {
      return next(
        new AppError(400, "Validation failed", formatZodError(parsed.error))
      );
    }

    req.validated = parsed.data;
    next();
  };
}

function formatZodError(error: ZodError) {
  return error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message
  }));
}
