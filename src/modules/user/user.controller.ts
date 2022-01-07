import { Body, Controller, Post } from '@nestjs/common';
import { ITokenResponse } from '../../interfaces/api.interface';
import { SignUpDto, SingInDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async signUp(@Body() data: SignUpDto): Promise<ITokenResponse> {
    const result = await this.userService.signUp(data);

    return result;
  }

  @Post('sign-in')
  async signIn(@Body() data: SingInDto): Promise<ITokenResponse> {
    const result = await this.userService.signIn(data);

    return result;
  }
}
