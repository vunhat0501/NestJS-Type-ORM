import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';

//** This is database config for production. in case when db changes in development, it won't immediately effect the website */
export default (): PostgresConnectionOptions => ({
	url: process.env.DB_URL,
	type: 'postgres',
	port: +(process.env.DB_PORT || 5432),
	entities: [path.resolve(__dirname, '..') + '/**/*.entity{.ts,.js}'],

	synchronize: false, // only set to true when developing
});
