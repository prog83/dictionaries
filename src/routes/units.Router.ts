import express from 'express';

import { validateBodyMiddleware } from 'middlewares';
import { UnitsController } from 'controllers';
import { UnitModel } from 'models';
import { ValidationGroups as Groups } from 'helpers';

/**
 *  @swagger
 *  components:
 *    schemas:
 *      UnitDto:
 *        type: object
 *        required:
 *          - id
 *          - label
 *        properties:
 *          id:
 *            type: number
 *            description: Id
 *            example: 32767
 *          label:
 *            type: string
 *            description: Label
 *            example: Some text
 */

/**
 *  @swagger
 *  tags:
 *    name: Units
 *    description: API for units dicrionary
 */

const router = express.Router();

/**
 *  @swagger
 *  /units:
 *    get:
 *      summary: Get units
 *      tags: [Units]
 *      security:
 *        - bearerAuth: []
 *
 *      responses:
 *        200:
 *          description: List units
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/UnitDto'
 *        401:
 *          $ref: '#/components/responses/401'
 *        403:
 *          $ref: '#/components/responses/403'
 *        404:
 *          $ref: '#/components/responses/404'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.get('/', UnitsController.read);

/**
 *  @swagger
 *  /units:
 *    post:
 *      summary: Create unit
 *      tags: [Units]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UnitDto'
 *
 *      responses:
 *        201:
 *          description: Created unit
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UnitDto'
 *        400:
 *          $ref: '#/components/responses/400'
 *        401:
 *          $ref: '#/components/responses/401'
 *        403:
 *          $ref: '#/components/responses/403'
 *        404:
 *          $ref: '#/components/responses/404'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.post('/', validateBodyMiddleware(UnitModel, [Groups.CREATE]), UnitsController.create);

/**
 *  @swagger
 *  /units/{id}:
 *    put:
 *      summary: Update unit
 *      tags: [Units]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: number
 *            example: 32767
 *          required: true
 *          description: Id unit
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - label
 *              properties:
 *                label:
 *                  type: string
 *                  description: Label
 *                  example: Some text
 *
 *      responses:
 *        200:
 *          description: Updated unit
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UnitDto'
 *        400:
 *          $ref: '#/components/responses/400'
 *        401:
 *          $ref: '#/components/responses/401'
 *        403:
 *          $ref: '#/components/responses/403'
 *        404:
 *          $ref: '#/components/responses/404'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.put('/:id', validateBodyMiddleware(UnitModel, [Groups.UPDATE]), UnitsController.update);

/**
 *  @swagger
 *  /units/{id}:
 *    get:
 *      summary: Get unit by id
 *      tags: [Units]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: number
 *            example: 32767
 *          required: true
 *          description: Id unit
 *
 *      responses:
 *        200:
 *          description: Unit
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UnitDto'
 *        400:
 *          $ref: '#/components/responses/400'
 *        401:
 *          $ref: '#/components/responses/401'
 *        403:
 *          $ref: '#/components/responses/403'
 *        404:
 *          $ref: '#/components/responses/404'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.get('/:id', UnitsController.readById);

export default router;
