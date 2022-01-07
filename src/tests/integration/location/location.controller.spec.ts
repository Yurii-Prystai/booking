import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LocationService } from '../../../modules/location/location.service';
import { LocationController } from '../../../modules/location/location.controller';
import { ActivityService } from '../../../modules/activity/activity.service';
import { RoomService } from '../../../modules/room/room.service';
import { Booking, Location, Room } from '../../../models';

describe('LocationController', () => {
  let controller: LocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [
        LocationService,
        RoomService,
        ActivityService,
        { provide: getRepositoryToken(Booking), useFactory: jest.fn(() => ({})) },
        { provide: getRepositoryToken(Room), useFactory: jest.fn(() => ({})) },
        { provide: getRepositoryToken(Location), useFactory: jest.fn(() => ({})) },
      ]
    }).compile();

    controller = module.get<LocationController>(LocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
