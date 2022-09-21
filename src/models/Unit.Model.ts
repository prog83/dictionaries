import { Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { IsNotEmpty, IsInt, IsString, MaxLength } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

import { ValidatorGroups as Groups } from 'helpers';

@Exclude()
@Entity('units')
export default class UnitModel {
  @Expose()
  @PrimaryColumn('int2')
  @IsNotEmpty({ groups: [Groups.CREATE] })
  @IsInt({ groups: [Groups.CREATE] })
  id!: number;

  @Expose()
  @Column({
    length: 50,
  })
  @IsNotEmpty({ groups: Groups.all() })
  @IsString({ groups: Groups.all() })
  @MaxLength(50, { groups: Groups.all() })
  label!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
