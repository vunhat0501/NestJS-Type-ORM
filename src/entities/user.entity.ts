import { Property } from 'src/entities/property.entity';
import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Optional } from '@nestjs/common';
import { Role } from 'src/auth/enums/role.enum';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstName: string;

	@Column({ nullable: true })
	lastName: string;

	@Column()
	email: string;

	@Column({ nullable: true })
	@Optional()
	avatarUrl: string;

	@CreateDateColumn()
	createAt: Date;

	@Column({ nullable: true })
	password: string;

	@Column({
		type: 'enum',
		enum: Role,
		default: Role.USER,
	})
	role: Role;

	@Column({ nullable: true })
	hashedRefreshToken: string;

	//** OPTIONAL: reverse call back to bi-access */
	@OneToMany(() => Property, (property) => property.user)
	properties: Property[];

	@ManyToMany(() => Property, (property) => property.likedBy)
	@JoinTable({ name: 'user_like_properties' })
	likedProperty: Property[];

	@BeforeInsert()
	async hashPassword() {
		this.password = await bcrypt.hash(this.password, 10);
	}
}
