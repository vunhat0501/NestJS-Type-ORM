import dbConfig from 'src/config/db.config';
import { MainSeeder } from 'src/seeding/main.seeder';
import { propertyFactory } from 'src/seeding/propertyFactory.factory';
import { propertyFeatureFactory } from 'src/seeding/propertyFeature.factory';
import { UserFactory } from 'src/seeding/user.factory';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
  ...dbConfig(),
  factories: [propertyFactory, UserFactory, propertyFeatureFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);
dataSource
  .initialize()
  .then(async () => {
    await dataSource.synchronize(true);
    await runSeeders(dataSource);
    await dataSource.destroy();
    process.exit();
  })
  .catch((err) => {
    console.error('Seeder fail:', err);
    process.exit(1);
  });
