import { faker } from '@faker-js/faker';
import { Property } from 'src/entities/property.entity';
import { PropertyFeature } from 'src/entities/propertyFeater.entity';
import { PropertyType } from 'src/entities/propertyType.entity';
import { User } from 'src/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    // function khong tra gi ve nen set void
    const typeRepo = dataSource.getRepository(PropertyType);

    console.log('Seeding PropertyTypes...');
    const propertyTypes = await typeRepo.save([
      { value: 'Condo' },
      { value: 'Apartment' },
    ]);

    const UserFactory = factoryManager.get(User);

    console.log('Seeding users...');
    const users = await UserFactory.saveMany(10);

    const propertyFactory = factoryManager.get(Property);
    const propertyFeatureFactory = factoryManager.get(PropertyFeature);

    console.log('Seeding properties...');
    const properties = await Promise.all(
      Array(50)
        .fill('')
        .map(async () => {
          // only create instance not put the data in database
          const property = await propertyFactory.make({
            user: faker.helpers.arrayElement(users),
            type: faker.helpers.arrayElement(propertyTypes),
            propertyFeature: await propertyFeatureFactory.save(),
          });
          return property;
        }),
    );
    const propertyRepo = dataSource.getRepository(Property);
    await propertyRepo.save(properties);
  }
}
