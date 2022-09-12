import { UnitModel } from 'models';

export class UnitDto {
  id: number;

  label: string;

  constructor(model: UnitModel) {
    this.id = model.id;
    this.label = model.label;
  }
}
