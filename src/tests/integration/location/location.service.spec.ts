import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LocationService } from '../../../modules/location/location.service';
import { RoomService } from '../../../modules/room/room.service';
import { ActivityService } from '../../../modules/activity/activity.service';
import { Booking, Location, Room } from '../../../models';

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationService,
        RoomService,
        ActivityService,
        { provide: getRepositoryToken(Booking), useFactory: jest.fn(() => ({})) },
        { provide: getRepositoryToken(Room), useFactory: jest.fn(() => ({})) },
        { provide: getRepositoryToken(Location), useFactory: jest.fn(() => ({})) },
      ],
    }).compile();

    service = module.get<LocationService>(LocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
