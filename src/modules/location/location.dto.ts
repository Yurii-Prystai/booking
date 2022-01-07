import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ENTITY_TYPES, ORDER_DIRECTION } from '../../enums/location.enum';

export class GetLocationQueryDto {
  @IsOptional()
  @IsString()
  countryName?: string;

  @IsOptional()
  @IsEnum(ORDER_DIRECTION)
  orderDirection?: ORDER_DIRECTION;
}

export class BookingDatesDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}

export class BookRoomByLocationParamsDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  id: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  entityTypeId: number;
}

export class BookEntityDto extends BookingDatesDto {
  @IsEnum(ENTITY_TYPES)
  entityType: ENTITY_TYPES;
}
