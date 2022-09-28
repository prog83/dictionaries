import { Entity } from 'typeorm';
import { Exclude } from 'class-transformer';

import AbstractModel from './Abstract.Model';

@Exclude()
@Entity('units')
export default class UnitModel extends AbstractModel {}
