import db from 'db';
import { StaffRoleModel } from 'models';
import { StaffRoleDto } from 'dtos';

const staffRolesRepository = db.getRepository(StaffRoleModel);

export default class StaffRolesRepository {
  static async createRole(payload: StaffRoleDto) {
    const role = staffRolesRepository.create(payload);
    return staffRolesRepository.save(role);
  }

  static async updateRole(role: StaffRoleModel, payload: Omit<StaffRoleDto, 'id' | 'alias'>) {
    staffRolesRepository.merge(role, payload);
    return staffRolesRepository.save(role);
  }

  static async removeRole(id: number) {
    const candidate = await StaffRolesRepository.getRole(id);
    if (!candidate) {
      return null;
    }

    return staffRolesRepository.remove(candidate);
  }

  static async getRoles() {
    return staffRolesRepository.find();
  }

  static async getRole(id: number) {
    return staffRolesRepository.findOneBy({ id });
  }
}
