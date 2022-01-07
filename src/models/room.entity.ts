import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { RoomType } from './roomType.entity';
import { Location } from './location.entity';

@Entity()
export class Room {
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

  @ManyToOne(() => RoomType, (roomType) => roomType.rooms)
  roomType: RoomType;

  @ManyToOne(() => Location, (location) => location.rooms)
  location: Location;
}
