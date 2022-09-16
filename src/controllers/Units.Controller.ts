import type { Request, Response, NextFunction } from 'express';

import { UnitsService } from 'services';
import { ApiError } from 'exceptions';
import type { Unit } from 'types/units';

export default class UnitsController {
  static async read(req: Request, res: Response<Array<Unit>>, next: NextFunction) {
    try {
      const unitsData = await UnitsService.getUnits();

      res.json(unitsData);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request<unknown, unknown, Unit>, res: Response<Unit>, next: NextFunction) {
    try {
      const { id, label } = req.body;
      const unitData = await UnitsService.createUnit({ id, label });

      res.status(201).json(unitData);
    } catch (error) {
      next(error);
    }
  }

  static async update(
    req: Request<{ id: number }, unknown, Omit<Unit, 'id'>>,
    res: Response<Unit>,
    next: NextFunction,
  ) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) {
        throw ApiError.BadRequest('Id має бути цілим числом!');
      }
      const { label } = req.body;
      const unitData = await UnitsService.updateUnit(id, { label });

      res.json(unitData);
    } catch (error) {
      next(error);
    }
  }

  static async readById(req: Request<{ id: string }>, res: Response<Unit>, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) {
        throw ApiError.BadRequest('Id має бути цілим числом!');
      }
      const unitData = await UnitsService.getUnit(id);

      res.json(unitData);
    } catch (error) {
      next(error);
    }
  }
}
