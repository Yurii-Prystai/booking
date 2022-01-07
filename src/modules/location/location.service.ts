import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, Location, Room } from '../../models';
import {
  IGetLocationResponse,
  IGetTopLocationResponse,
  IUserData,
} from '../../interfaces';
import {
  BookEntityDto,
  BookingDatesDto,
  BookRoomByLocationParamsDto,
  GetLocationQueryDto,
} from './location.dto';
import { ENTITY_TYPES, ORDER_DIRECTION } from '../../enums';
import { RoomService } from '../room/room.service';
import { ActivityService } from '../activity/activity.service';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    private readonly roomService: RoomService,
    private readonly activityService: ActivityService,
  ) {}

  public async getLocations({
    countryName,
    orderDirection = ORDER_DIRECTION.ASC,
  }: GetLocationQueryDto): Promise<IGetLocationResponse[]> {
    const countryCondition = countryName ? { country: countryName } : null;

    const options = {
      where: countryCondition,
      order: { country: orderDirection },
    };

    return this.locationRepository.find(options);
  }

  public async getTopLocations(
    roomCount = 3,
  ): Promise<IGetTopLocationResponse[]> {
    return this.bookingRepository
      .createQueryBuilder('bk')
      .innerJoin('room', 'rm', 'rm.id=bk.entity_id')
      .innerJoin('location', 'loc', 'loc.id=rm.location_id')
      .select('loc.city', 'city')
      .addSelect('loc.country', 'country')
      .addSelect('count(bk.entity_id)', 'bookingCount')
      .groupBy('loc.city, loc.country, loc.id')
      .orderBy('"bookingCount"', 'DESC')
      .limit(roomCount)
      .getRawMany();
  }

  public async getAvailableRoomTypesByLocationId(
    id: number,
    { startDate, endDate }: BookingDatesDto,
  ) {
    return this.roomRepository
      .createQueryBuilder('rm')
      .distinctOn(['rt.id'])
      .innerJoin('room_type', 'rt', 'rt.id=rm.type_id')
      .leftJoin(
        'booking',
        'bk',
        `bk.entity_id=rm.id AND
        (bk.start_date BETWEEN :startDate AND :endDate OR
        bk.end_date BETWEEN :startDate AND :endDate)`,
        { startDate, endDate },
      )
      .where('rm.location_id = :id AND bk.entity_id IS NULL', { id })
      .select('rt.id', 'id')
      .addSelect('rt.name', 'name')
      .addSelect('rt.price', 'price')
      .orderBy('rt.id')
      .getRawMany();
  }

  public async bookRoomForLocation(
    { id: locationId, entityTypeId }: BookRoomByLocationParamsDto,
    { startDate, endDate, entityType }: BookEntityDto,
    { userId }: IUserData,
  ) {
    if (entityType === ENTITY_TYPES.ROOM) {
      return this.roomService.bookRoomByLocationId(
        userId,
        locationId,
        entityTypeId,
        startDate,
        endDate,
      );
    }

    return this.activityService.bookActivityByLocationId(
      userId,
      locationId,
      entityTypeId,
      startDate,
      endDate,
    );
  }
}
