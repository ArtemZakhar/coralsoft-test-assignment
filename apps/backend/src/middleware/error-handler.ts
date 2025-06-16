import { Request, Response, NextFunction } from 'express';
import { responseCodesAndMsg } from '../constants/response';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      details: err.details,
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(responseCodesAndMsg.codes[400]).json({
      error: responseCodesAndMsg.messages.error.validationError,
      details: err.message,
    });
  }

  return res.status(responseCodesAndMsg.codes[500]).json({
    error: responseCodesAndMsg.messages.error.internalServerError,
  });
};
