import { PropertyFeature } from 'src/entities/propertyFeater.entity';
import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';

export const propertyFeatureFactory = setSeederFactory(PropertyFeature, () => {
	const feature = new PropertyFeature();
	feature.area = faker.number.int({ min: 25, max: 2500 });
	feature.bathrooms = faker.number.int({ min: 1, max: 3 });
	feature.bedrooms = faker.number.int({ min: 1, max: 3 });
	feature.parkingSpots = faker.number.int({ min: 1, max: 3 });
	feature.hasBalcony = faker.datatype.boolean();
	feature.hasGardenYard = faker.datatype.boolean();
	feature.hasSwimmingPool = faker.datatype.boolean();

	return feature;
});
