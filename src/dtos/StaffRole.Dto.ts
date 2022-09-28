import { StaffRoleModel } from 'models';

export class StaffRoleDto {
  id: number;

  label: string;

  alias: string;

  constructor(model: StaffRoleModel) {
    this.id = model.id;
    this.label = model.label;
    this.alias = model.alias;
  }
}
