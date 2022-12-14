import db from 'db';
import { UnitModel } from 'models';
import { UnitDto } from 'dtos';

const unitsRepository = db.getRepository(UnitModel);

export default class UnitsRepository {
  static async createUnit(payload: UnitDto) {
    const unit = unitsRepository.create(payload);
    return unitsRepository.save(unit);
  }

  static async updateUnit(unit: UnitModel, payload: Omit<UnitDto, 'id'>) {
    unitsRepository.merge(unit, payload);
    return unitsRepository.save(unit);
  }

  static async removeUnit(id: number) {
    const candidate = await UnitsRepository.getUnit(id);
    if (!candidate) {
      return null;
    }

    return unitsRepository.remove(candidate);
  }

  static async getUnits() {
    return unitsRepository.find();
  }

  static async getUnit(id: number) {
    return unitsRepository.findOneBy({ id });
  }
}
