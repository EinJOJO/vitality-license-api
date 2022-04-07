import express, { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { createLicense } from './model/licenses';
import Logger from './model/logger';
import { Product } from './types/License';
dotenv.config();

const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth) {
    reject(res, 401, 'Unauthorized');
  } else {
    if (auth == process.env.SECRET) {
      next();
    } else {
      reject(res, 403, 'Forbidden');
    }
  }
});

router.post('/', async (req: Request, res: Request) => {});

const reject = (res: Response, code: number, message: string) => {
  res.json({
    error: {
      code: code,
      message: message,
    },
  });
};

createLicense(Product.Account_Maxer)
  .then((s) => {})
  .catch(Logger.error);
