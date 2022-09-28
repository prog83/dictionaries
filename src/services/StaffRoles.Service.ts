import { StaffRolesRepository } from 'repositories';

import { StaffRoleDto } from 'dtos';
import { ApiError } from 'exceptions';

export default class StaffRolesService {
  static async createRole(payload: StaffRoleDto) {
    const role = await StaffRolesRepository.createRole(payload);
    const roleDto = new StaffRoleDto(role);

    return roleDto;
  }

  static async updateRole(id: number, payload: Omit<StaffRoleDto, 'id' | 'alias'>) {
    const candidate = await StaffRolesRepository.getRole(id);
    if (!candidate) {
      throw ApiError.NotFoundError(`Кадри | Роль з кодом "${id}" не знайдено!`);
    }
    const role = await StaffRolesRepository.updateRole(candidate, payload);

    const roleDto = new StaffRoleDto(role);

    return roleDto;
  }

  static async getRoles() {
    const roles = await StaffRolesRepository.getRoles();
    const rolesDto = roles.map((role) => new StaffRoleDto(role));

    return rolesDto;
  }

  static async getRole(id: number) {
    const role = await StaffRolesRepository.getRole(id);
    if (!role) {
      throw ApiError.NotFoundError(`Кадри | Роль з кодом "${id}" не знайдено!`);
    }

    const roleDto = new StaffRoleDto(role);

    return roleDto;
  }
}
