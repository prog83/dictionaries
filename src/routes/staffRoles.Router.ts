import express from 'express';

import { validateBodyMiddleware } from 'middlewares';
import { StaffRolesController } from 'controllers';
import { StaffRoleModel } from 'models';
import { ValidatorGroups as Groups } from 'helpers';

/**
 *  @swagger
 *  components:
 *    schemas:
 *      StaffRoleDto:
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
 *    name: StaffRoles
 *    description: API for staff roles dictionary
 */

const router = express.Router();

/**
 *  @swagger
 *  /staff-roles:
 *    get:
 *      summary: Get staff  roles
 *      tags: [StaffRoles]
 *      security:
 *        - bearerAuth: []
 *
 *      responses:
 *        200:
 *          description: List staff roles
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/StaffRoleDto'
 *        401:
 *          $ref: '#/components/responses/401'
 *        403:
 *          $ref: '#/components/responses/403'
 *        404:
 *          $ref: '#/components/responses/404'
 *        500:
 *          $ref: '#/components/responses/500'
 */
router.get('/', StaffRolesController.read);

/**
 *  @swagger
 *  /staff-roles:
 *    post:
 *      summary: Create staff role
 *      tags: [StaffRoles]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/StaffRoleDto'
 *
 *      responses:
 *        201:
 *          description: Created staff role
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/StaffRoleDto'
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
router.post('/', validateBodyMiddleware(StaffRoleModel, [Groups.CREATE]), StaffRolesController.create);

/**
 *  @swagger
 *  /staff-roles/{id}:
 *    put:
 *      summary: Update staff role
 *      tags: [StaffRoles]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: number
 *            example: 32767
 *          required: true
 *          description: Id staff role
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
 *          description: Updated staff role
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/StaffRoleDto'
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
router.put('/:id', validateBodyMiddleware(StaffRoleModel, [Groups.UPDATE]), StaffRolesController.update);

/**
 *  @swagger
 *  /staff-roles/{id}:
 *    get:
 *      summary: Get staff role by id
 *      tags: [StaffRoles]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: number
 *            example: 32767
 *          required: true
 *          description: Id staff role
 *
 *      responses:
 *        200:
 *          description: Staff role
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/StaffRoleDto'
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
router.get('/:id', StaffRolesController.readById);

export default router;
