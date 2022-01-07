import { HttpException, HttpStatus } from '@nestjs/common';

export class RoomAlreadyBookedException extends HttpException {
  public static readonly exceptionMessage = 'Room already booked!';

  constructor() {
    super(RoomAlreadyBookedException.exceptionMessage, HttpStatus.CONFLICT);
  }
}
