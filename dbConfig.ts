import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const pgConfig: PostgresConnectionOptions = {
	url: 'postgresql://realEstateDB_owner:npg_F7EHctUMPC0x@ep-mute-resonance-a14s3vql-pooler.ap-southeast-1.aws.neon.tech/realEstateDB?sslmode=require',
	type: 'postgres',
	port: 5432,
	entities: [__dirname + '/**/*.entity{.ts,.js}'],
	synchronize: true, // only set to true when developing
};
