import { Entity, Column } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { ValidatorGroups as Groups } from 'helpers';

import AbstractModel from './Abstract.Model';

@Exclude()
@Entity('permissions')
export default class PermissionModel extends AbstractModel {
  @Expose()
  @Column({
    length: 50,
  })
  @IsNotEmpty({ groups: [Groups.CREATE] })
  @IsString({ groups: [Groups.CREATE] })
  @MaxLength(50, { groups: [Groups.CREATE] })
  alias!: string;
}
