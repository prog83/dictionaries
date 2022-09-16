import { unitsRepository } from 'repositories';
import { UnitDto } from 'dtos';
import { ApiError } from 'exceptions';
import type { Unit } from 'types/units';

export default class UnitsService {
  static async createUnit(payload: Unit) {
    const unit = await unitsRepository.createUnit(payload);
    const unitDto = new UnitDto(unit);

    return unitDto;
  }

  static async updateUnit(id: number, payload: Omit<Unit, 'id'>) {
    const candidate = await unitsRepository.getUnit(id);
    if (!candidate) {
      throw ApiError.NotFoundError(`Підрозділ з кодом "${id}" не знайдено!`);
    }
    const unit = await unitsRepository.updateUnit(candidate, payload);

    const unitDto = new UnitDto(unit);

    return unitDto;
  }

  static async getUnits() {
    const units = await unitsRepository.getUnits();
    const unitsDto = units.map((unit) => new UnitDto(unit));

    return unitsDto;
  }

  static async getUnit(id: number) {
    const unit = await unitsRepository.getUnit(id);
    if (!unit) {
      throw ApiError.NotFoundError(`Підрозділ з кодом "${id}" не знайдено!`);
    }

    const unitDto = new UnitDto(unit);

    return unitDto;
  }
}
