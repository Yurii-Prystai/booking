import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvalidPasswordEmailException } from '../../exceptions';
import { UserAlreadyExistsException } from '../../exceptions';
import { ITokenResponse } from '../../interfaces/api.interface';
import { User } from '../../models/user.entity';
import { encryptData, generateToken, verifyData } from '../../utils';
import { SignUpDto, SingInDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async signUp({
    email,
    firstName,
    lastName,
    password,
  }: SignUpDto): Promise<ITokenResponse> {
    const foundUser = await this.userRepository.findOne({ email });

    if (foundUser) {
      throw new UserAlreadyExistsException();
    }
    const hash = encryptData(password);
    const { id: userId } = await this.userRepository.save({
      email,
      firstName,
      lastName,
      password: hash,
    });
    const token = generateToken({ userId }, process.env.JWT_SECRET);

    return { token };
  }

  public async signIn({ email, password }: SingInDto): Promise<ITokenResponse> {
    const foundUser = await this.userRepository.findOneOrFail({ email });
    const passwordValid = verifyData(password, foundUser.password);

    if (!passwordValid) {
      throw new InvalidPasswordEmailException();
    }

    return {
      token: generateToken({ userId: foundUser.id }, process.env.JWT_SECRET),
    };
  }
}
