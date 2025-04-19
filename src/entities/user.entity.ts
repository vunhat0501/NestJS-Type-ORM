import { Property } from 'src/entities/property.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column()
	email: string;

	@Column()
	avatarUrl: string;

	@CreateDateColumn()
	createAt: Date;

	//** OPTIONAL: reverse call back to bi-access */
	@OneToMany(() => Property, (property) => property.user)
	properties: Property[];

	@ManyToMany(() => Property, (property) => property.likedBy)
	@JoinTable({ name: 'user_like_properties' })
	likedProperty: Property[];
}
