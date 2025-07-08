import { Property } from 'src/entities/property.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PropertyType {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	value: string;

	@OneToMany(() => Property, (property) => property.type)
	properties: Property[];
}
