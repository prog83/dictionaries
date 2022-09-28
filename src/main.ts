import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import 'reflect-metadata';

import 'env';
import { notFoundMiddleware, errorMiddleware } from 'middlewares';
import rootRouter from 'routes';
import db from 'db';

const { SCHEME, HOST } = process.env;
const PORT = parseInt(process.env.PORT ?? '', 10) || 3000;

export const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: 'https://develop.portal.smartdisys.com',
//     credentials: false,
//   }),
// );

app.use(rootRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const bootstrap = async () => {
  try {
    await db.initialize();

    app.listen(PORT, () => {
      console.log(`App listening at ${SCHEME}://${HOST}:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

if (require.main === module) {
  bootstrap();
}
