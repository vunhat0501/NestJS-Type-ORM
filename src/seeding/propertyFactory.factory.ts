import { Property } from 'src/entities/property.entity';
import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';

export const propertyFactory = setSeederFactory(Property, () => {
	const property = new Property();
	property.name = faker.location.street();
	property.price = Math.round(
		+faker.commerce.price({ min: 10000, max: 1000000 }),
	);
	property.description = faker.lorem.sentence();

	return property;
});
