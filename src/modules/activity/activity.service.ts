import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, getConnection, Repository } from 'typeorm';
import { Activity, Booking } from '../../models';
import { ENTITY_TYPES } from '../../enums';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  private async getActivityByType(
    locationId: number,
    activityTypeId: number,
    entityManager: EntityManager,
  ): Promise<{ id: number; price: number }> {
    return entityManager
      .createQueryBuilder(Activity, 'ac')
      .innerJoin('activity_type', 'at', 'at.id=ac.type_id')
      .where(`ac.location_id = :locationId AND ac.type_id = :activityTypeId`, {
        locationId,
        activityTypeId,
      })
      .select('ac.id', 'id')
      .addSelect('at.price', 'price')
      .getRawOne();
  }

  public async bookActivityByLocationId(
    userId: number,
    locationId: number,
    activityTypeId: number,
    startDate: Date | string,
    endDate: Date | string,
  ) {
    return getConnection().transaction(async (transactionalEntityManager) => {
      const activity = await this.getActivityByType(
        locationId,
        activityTypeId,
        transactionalEntityManager,
      );

      const booking = this.bookingRepository.create({
        userId,
        entityId: activity.id,
        entityType: ENTITY_TYPES.ACTIVITY,
        price: activity.price,
        startDate,
        endDate,
      });

      return transactionalEntityManager.save(booking);
    });
  }
}
