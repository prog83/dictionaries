import type { Request, Response, NextFunction } from 'express';

import { PermissionsService } from 'services';
import { ApiError } from 'exceptions';
import { PermissionDto } from 'dtos';

export default class PermissionsController {
  static async read(req: Request, res: Response<Array<PermissionDto>>, next: NextFunction) {
    try {
      const permissionsData = await PermissionsService.getPermissions();

      res.json(permissionsData);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request<unknown, unknown, PermissionDto>, res: Response<PermissionDto>, next: NextFunction) {
    try {
      const { id, label, alias } = req.body;
      const permissionData = await PermissionsService.createPermission({ id, label, alias });

      res.status(201).json(permissionData);
    } catch (error) {
      next(error);
    }
  }

  static async update(
    req: Request<{ id: number }, unknown, Omit<PermissionDto, 'id' | 'alias'>>,
    res: Response<PermissionDto>,
    next: NextFunction,
  ) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) {
        throw ApiError.BadRequest('Id має бути цілим числом!');
      }
      const { label } = req.body;
      const permissionData = await PermissionsService.updatePermission(id, { label });

      res.json(permissionData);
    } catch (error) {
      next(error);
    }
  }

  static async readById(req: Request<{ id: string }>, res: Response<PermissionDto>, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) {
        throw ApiError.BadRequest('Id має бути цілим числом!');
      }
      const permissionData = await PermissionsService.getPermission(id);

      res.json(permissionData);
    } catch (error) {
      next(error);
    }
  }
}
