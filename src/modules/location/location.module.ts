import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { Booking, Location, Room } from '../../models';
import { RoomModule } from '../room/room.module';
import { ActivityModule } from '../activity/activity.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location, Booking, Room]),
    RoomModule,
    ActivityModule,
  ],
  providers: [LocationService],
  controllers: [LocationController],
})
export class LocationModule {}
