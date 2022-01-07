import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  public static readonly exceptionMessage = 'User already exists!';

  constructor() {
    super(UserAlreadyExistsException.exceptionMessage, HttpStatus.BAD_REQUEST);
  }
}
