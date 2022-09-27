import express from 'express';

import { validateBodyMiddleware } from 'middlewares';
import { PermissionsController } from 'controllers';
import { PermissionModel } from 'models';
import { ValidatorGroups as Groups } from 'helpers';

/**
 *  @swagger
 *  components:
 *    schemas:
 *      PermissionDto:
 *        type: object
 *        required:
 *          - id
 *          - label
 *        properties:
 *          id:
 *            type: number
 *            description: Id
 *            example: 32767
 *          alias:
 *            type: string
 *            description: Alias ldap
 *            example: Some text
 *          label:
 *            type: string
 *            description: Label
 *            example: Some text
 */

/**
 *  @swagger
 *  tags:
 *    name: Permissions
 *    description: API for permissions dictionary
 */

const router = express.Router();

/**
 *  @swagger
 *  /permissions:
 *    get:
 *      summary: Get permissions
 *      tags: [Permissions]
 *      security:
 *        - bearerAuth: []
 *
 *      responses:
 *        200:
 *          description: List permissions
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/PermissionDto'
 *        401:
 *          $ref: '#/components/responses/401'
 *        403:
 *          $ref: '#/components/responses/403'
 *        404:
 *          $ref: '#/components/responses/404'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.get('/', PermissionsController.read);

/**
 *  @swagger
 *  /permissions:
 *    post:
 *      summary: Create permission
 *      tags: [Permissions]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PermissionDto'
 *
 *      responses:
 *        201:
 *          description: Created permission
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PermissionDto'
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
router.post('/', validateBodyMiddleware(PermissionModel, [Groups.CREATE]), PermissionsController.create);

/**
 *  @swagger
 *  /permissions/{id}:
 *    put:
 *      summary: Update permission
 *      tags: [Permissions]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: number
 *            example: 32767
 *          required: true
 *          description: Id permission
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
 *          description: Updated permission
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PermissionDto'
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
router.put('/:id', validateBodyMiddleware(PermissionModel, [Groups.UPDATE]), PermissionsController.update);

/**
 *  @swagger
 *  /permission/{id}:
 *    get:
 *      summary: Get permission by id
 *      tags: [Permissions]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: number
 *            example: 32767
 *          required: true
 *          description: Id permission
 *
 *      responses:
 *        200:
 *          description: Permission
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PermissionDto'
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
router.get('/:id', PermissionsController.readById);

export default router;
