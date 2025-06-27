import { Property } from 'src/entities/property.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PropertyFeature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bathrooms: number;

  @Column()
  bedrooms: number;

  @Column()
  parkingSpots: number;

  @Column()
  area: number;

  @Column()
  hasBalcony: boolean;

  @Column()
  hasGardenYard: boolean;

  @Column()
  hasSwimmingPool: boolean;

  //** OPTIONAL: reverse call back to bi-access */
  @OneToOne(() => Property, (property) => property.propertyFeature)
  @JoinColumn()
  property: Property;
}
