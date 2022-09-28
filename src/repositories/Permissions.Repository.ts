import db from 'db';
import { PermissionModel } from 'models';
import { PermissionDto } from 'dtos';

const permissionsRepository = db.getRepository(PermissionModel);

export default class PermissionsRepository {
  static async createPermission(payload: PermissionDto) {
    const permission = permissionsRepository.create(payload);
    return permissionsRepository.save(permission);
  }

  static async updatePermission(permission: PermissionModel, payload: Omit<PermissionDto, 'id' | 'alias'>) {
    permissionsRepository.merge(permission, payload);
    return permissionsRepository.save(permission);
  }

  static async removePermission(id: number) {
    const candidate = await PermissionsRepository.getPermission(id);
    if (!candidate) {
      return null;
    }

    return permissionsRepository.remove(candidate);
  }

  static async getPermissions() {
    return permissionsRepository.find();
  }

  static async getPermission(id: number) {
    return permissionsRepository.findOneBy({ id });
  }
}
