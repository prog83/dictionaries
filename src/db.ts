import { DataSource } from 'typeorm';

import { PermissionModel, StaffRoleModel, UnitModel } from 'models';

const db = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '', 10) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  schema: 'dict',
  synchronize: true,
  // logging: true,
  entities: [PermissionModel, StaffRoleModel, UnitModel],
  // subscribers: [],
  // migrations: [],
});

export default db;
