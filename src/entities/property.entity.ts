import { PropertyFeature } from 'src/entities/propertyFeater.entity';
import { PropertyType } from 'src/entities/propertyType.entity';
import { User } from 'src/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  price: number;

  //** OPTIONAL reverse call back to bi-access */
  @OneToOne(
    () => PropertyFeature,
    (propertyFeature) => propertyFeature.property,
    { cascade: true },
  ) //* can set cascade to a specific operation
  propertyFeature: PropertyFeature;

  //** OPTIONAL: reverse call back to bi-access */
  @ManyToOne(() => User, (user) => user.properties)
  @JoinColumn({ name: 'ownerId' })
  user: User;

  @ManyToMany(() => User, (user) => user.likedProperty)
  likedBy: User[];

  @ManyToOne(() => PropertyType, (propertyType) => propertyType.properties)
  @JoinColumn({ name: 'typeId' })
  type: PropertyType;
}
