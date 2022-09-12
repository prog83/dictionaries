import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import 'reflect-metadata';

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import 'env';
import { notFoundMiddleware, errorMiddleware } from 'middlewares';
import rootRouter from 'routes';
import db from 'db';

const { SCHEME, HOST } = process.env;
export const PORT = parseInt(process.env.PORT ?? '', 10) || 3000;

export const app = express();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dictionaries',
      version: '0.1.0',
      description: 'Dictionaries',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Oleksandr Myronov',
        mxid: '@o.myronov:dz.biz.ua',
      },
    },
    servers: [
      {
        url: `${SCHEME}://${HOST}:${PORT}`,
      },
    ],
  },
  apis: ['./build/app.js', './build/routes/health.Router.js', './build/routes/units.Router.js'],
};

const specs = swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 *  @swagger
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 *
 *    schemas:
 *      Error:
 *        type: object
 *        required:
 *          - statusCode
 *          - timestamp
 *          - message
 *          - errors
 *        properties:
 *          statusCode:
 *            type: number
 *            description: Error status code
 *            example: 500
 *          timestamp:
 *            type: string
 *            format: date-time
 *            description: Error datetime
 *            example: 2022-09-12T08:02:45.633Z
 *          message:
 *            type: string
 *            description: Error message
 *            example: Some text
 *          errors:
 *            type: array
 *            description: Errors list
 *            items:
 *              type: object
 *              properties:
 *                path:
 *                  type: string
 *                  description: Path error
 *                  example: label
 *                constraints:
 *                  type: object
 *                  additionalProperties:
 *                    type: string
 *                  description: Constraints
 *
 *    responses:
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      403:
 *        description: Forbidden
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      404:
 *        description: Not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 */

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

async function run() {
  try {
    await db.initialize();

    app.listen(PORT, () => {
      console.log(`App listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

if (require.main === module) {
  run();
}
