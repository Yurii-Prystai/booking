import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidPasswordEmailException extends HttpException {
  public static readonly exceptionMessage = 'Password or email is invalid!';

  constructor() {
    super(
      InvalidPasswordEmailException.exceptionMessage,
      HttpStatus.BAD_REQUEST,
    );
  }
}
