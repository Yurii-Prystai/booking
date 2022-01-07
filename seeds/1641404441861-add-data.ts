import { MigrationInterface, QueryRunner } from 'typeorm';
import { Activity, Booking, Room } from '../src/models';
import { ACTIVITIES, BOOKINGS, ROOMS } from './data';

export class addData1641404441861 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(Activity, ACTIVITIES);
    await queryRunner.manager.save(Room, ROOMS);
    await queryRunner.manager.save(Booking, BOOKINGS);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(
      Activity,
      ACTIVITIES.map(({ id }) => id),
    );
    await queryRunner.manager.delete(
      Room,
      ROOMS.map(({ id }) => id),
    );
    await queryRunner.manager.delete(
      Booking,
      BOOKINGS.map(({ id }) => id),
    );
  }
}
