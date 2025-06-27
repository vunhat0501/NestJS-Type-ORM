import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'dbconfig.dev',
  (): PostgresConnectionOptions => ({
    url: process.env.DB_URL,
    type: 'postgres',
    port: +(process.env.DB_PORT || 5432),
    entities: [path.resolve(__dirname, '..') + '/**/*.entity{.ts,.js}'],

    synchronize: true, // only set to true when developing
  }),
);
