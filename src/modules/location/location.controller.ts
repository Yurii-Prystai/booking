import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { AuthGuard } from '../../guards/auth.guard';
import {
  BookRoomByLocationParamsDto,
  BookingDatesDto,
  GetLocationQueryDto,
  BookEntityDto,
} from './location.dto';
import {
  IGetLocationResponse,
  IGetTopLocationResponse,
} from '../../interfaces/api.interface';
import { UserData } from '../../decorators';
import { IUserData } from '../../interfaces';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @UseGuards(AuthGuard)
  @Get()
  async get(
    @Query() query: GetLocationQueryDto,
  ): Promise<IGetLocationResponse[]> {
    const result = await this.locationService.getLocations(query);

    return result;
  }

  @UseGuards(AuthGuard)
  @Get('top')
  async getTop(
    @Query('roomCount') roomCount: number,
  ): Promise<IGetTopLocationResponse[]> {
    const result = await this.locationService.getTopLocations(roomCount);

    return result;
  }

  @UseGuards(AuthGuard)
  @Get(':id/available-room-types')
  async getAvailable(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: BookingDatesDto,
  ) {
    const result = await this.locationService.getAvailableRoomTypesByLocationId(
      id,
      query,
    );

    return result;
  }

  @UseGuards(AuthGuard)
  @Post(':id/book/:entityTypeId')
  async createBooking(
    @Param() params: BookRoomByLocationParamsDto,
    @Body() body: BookEntityDto,
    @UserData() userData: IUserData,
  ) {
    const result = await this.locationService.bookRoomForLocation(params, body, userData);

    return result;
  }
}
