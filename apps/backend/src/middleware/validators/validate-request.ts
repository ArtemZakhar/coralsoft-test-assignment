import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { responseCodesAndMsg } from '../../constants/response';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(responseCodesAndMsg.codes[400]).json({
      error: responseCodesAndMsg.messages.error.validationError,
      details: errors.array(),
    });
  }
  next();
};
