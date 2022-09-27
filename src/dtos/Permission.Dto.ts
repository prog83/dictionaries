import { PermissionModel } from 'models';

export class PermissionDto {
  id: number;

  label: string;

  alias: string;

  constructor(model: PermissionModel) {
    this.id = model.id;
    this.label = model.label;
    this.alias = model.alias;
  }
}
