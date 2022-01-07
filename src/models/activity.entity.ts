import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ActivityType } from './activityType.entity';
import { Location } from './location.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  typeId: number;

  @Column()
  locationId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ActivityType, (activityType) => activityType.activities)
  activityType: ActivityType;

  @ManyToOne(() => Location, (location) => location.activities)
  location: Location;
}
