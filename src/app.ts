import express, { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import { createLicense } from './model/licenses';
import { GenerationRequest, Product } from './types/License';
import Logger from './model/logger';

const PORT = process.env.API_PORT || 80;
const app = express();

app.use(bodyParser.json({}));
app.use((req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth) {
    reject(res, 401, 'Unauthorized');
  } else {
    if (auth != process.env.SECRET) {
      reject(res, 403, 'Forbidden');
    } else {
      const body = req.body;
      Logger.log(
        `Request to \`/\` \n method: ${req.method} \n body: ${JSON.stringify(
          body
        )} \n`,
        'Router | Middleware'
      );
      next();
    }
  }
});

app.post('/', async (req: Request, res: Response) => {
  const body: GenerationRequest = req.body;
  if (body.product) {
    try {
      const license = await createLicense(body.product);
      res.status(201).json({
        data: {
          license: license,
          product: body.product,
        },
      });
    } catch (error) {
      Logger.error(error);
    }
  } else {
    reject(res, 400, 'No product provided');
  }
});

app.listen(PORT, () => {
  Logger.log(
    `License API is now listening on port *${PORT}*`,
    'Server started'
  );
});

const reject = (res: Response, code: number, message: string) => {
  res.status(code).json({
    error: {
      code: code,
      message: message,
    },
  });
};
