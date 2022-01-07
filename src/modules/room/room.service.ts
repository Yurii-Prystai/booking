import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, getConnection, Repository } from 'typeorm';
import { ENTITY_TYPES } from '../../enums/location.enum';
import { RoomAlreadyBookedException } from '../../exceptions';
import { Booking, Room } from '../../models';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  private async getAvailableRoom(
    locationId: number,
    roomTypeId: number,
    startDate: Date | string,
    endDate: Date | string,
    entityManager: EntityManager,
  ): Promise<{ id: number, price: number}> {
    const availableRoom = await entityManager
      .createQueryBuilder(Room, 'rm')
      .innerJoin('room_type', 'rt', 'rt.id=rm.type_id')
      .leftJoin(
        'booking',
        'bk',
        `bk.entity_id=rm.id AND
        (bk.start_date BETWEEN :startDate AND :endDate OR
        bk.end_date BETWEEN :startDate AND :endDate)`,
        { startDate, endDate },
      )
      .where(
        `rm.location_id = :locationId AND rm.type_id = :roomTypeId AND bk.entity_id IS NULL`,
        { locationId, roomTypeId },
      )
      .select('rm.id', 'id')
      .addSelect('rt.price', 'price')
      .getRawOne();
    
    if (!availableRoom) {
      throw new RoomAlreadyBookedException();
    }

    return availableRoom;
  }

  public async bookRoomByLocationId(
    userId: number,
    locationId: number,
    roomTypeId: number,
    startDate: Date | string,
    endDate: Date | string,
  ) {
    return getConnection().transaction(async transactionalEntityManager => {
      const availableRoom =  await this.getAvailableRoom(
        locationId,
        roomTypeId,
        startDate,
        endDate,
        transactionalEntityManager,
      );

      const booking = this.bookingRepository.create({
        userId,
        entityId: availableRoom.id,
        entityType: ENTITY_TYPES.ROOM,
        price: availableRoom.price,
        startDate,
        endDate,
      });

      return transactionalEntityManager.save(booking);
    });
  }
}
