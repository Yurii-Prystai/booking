import { MigrationInterface, QueryRunner } from 'typeorm';
import { ActivityType, Location, RoomType, User } from '../src/models';
import { ACTIVITY_TYPES, LOCATIONS, ROOM_TYPES, USERS } from './data';

export class initialSeed1641304938664 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(ActivityType, ACTIVITY_TYPES);
    await queryRunner.manager.save(RoomType, ROOM_TYPES);
    await queryRunner.manager.save(User, USERS);
    await queryRunner.manager.save(Location, LOCATIONS);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(
      ActivityType,
      ACTIVITY_TYPES.map(({ id }) => id),
    );
    await queryRunner.manager.delete(
      RoomType,
      ROOM_TYPES.map(({ id }) => id),
    );
    await queryRunner.manager.delete(
      User,
      USERS.map(({ id }) => id),
    );
    await queryRunner.manager.delete(
      Location,
      LOCATIONS.map(({ id }) => id),
    );
  }
}
