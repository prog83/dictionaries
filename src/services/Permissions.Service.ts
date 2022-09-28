import { PermissionsRepository } from 'repositories';

import { PermissionDto } from 'dtos';
import { ApiError } from 'exceptions';

export default class PermissionsService {
  static async createPermission(payload: PermissionDto) {
    const permission = await PermissionsRepository.createPermission(payload);
    const permissionDto = new PermissionDto(permission);

    return permissionDto;
  }

  static async updatePermission(id: number, payload: Omit<PermissionDto, 'id' | 'alias'>) {
    const candidate = await PermissionsRepository.getPermission(id);
    if (!candidate) {
      throw ApiError.NotFoundError(`Групу доступу з кодом "${id}" не знайдено!`);
    }
    const permission = await PermissionsRepository.updatePermission(candidate, payload);

    const permissionDto = new PermissionDto(permission);

    return permissionDto;
  }

  static async getPermissions() {
    const permissions = await PermissionsRepository.getPermissions();
    const permissionsDto = permissions.map((permission) => new PermissionDto(permission));

    return permissionsDto;
  }

  static async getPermission(id: number) {
    const permission = await PermissionsRepository.getPermission(id);
    if (!permission) {
      throw ApiError.NotFoundError(`Групу доступу з кодом "${id}" не знайдено!`);
    }

    const permissionDto = new PermissionDto(permission);

    return permissionDto;
  }
}
