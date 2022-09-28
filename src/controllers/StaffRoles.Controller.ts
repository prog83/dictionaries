import type { Request, Response, NextFunction } from 'express';

import { StaffRolesService } from 'services';
import { ApiError } from 'exceptions';
import { StaffRoleDto } from 'dtos';

export default class StaffRolesController {
  static async read(req: Request, res: Response<Array<StaffRoleDto>>, next: NextFunction) {
    try {
      const rolesData = await StaffRolesService.getRoles();

      res.json(rolesData);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request<unknown, unknown, StaffRoleDto>, res: Response<StaffRoleDto>, next: NextFunction) {
    try {
      const { id, label, alias } = req.body;
      const roleData = await StaffRolesService.createRole({ id, label, alias });

      res.status(201).json(roleData);
    } catch (error) {
      next(error);
    }
  }

  static async update(
    req: Request<{ id: number }, unknown, Omit<StaffRoleDto, 'id' | 'alias'>>,
    res: Response<StaffRoleDto>,
    next: NextFunction,
  ) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) {
        throw ApiError.BadRequest('Id має бути цілим числом!');
      }
      const { label } = req.body;
      const roleData = await StaffRolesService.updateRole(id, { label });

      res.json(roleData);
    } catch (error) {
      next(error);
    }
  }

  static async readById(req: Request<{ id: string }>, res: Response<StaffRoleDto>, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) {
        throw ApiError.BadRequest('Id має бути цілим числом!');
      }
      const roleData = await StaffRolesService.getRole(id);

      res.json(roleData);
    } catch (error) {
      next(error);
    }
  }
}
