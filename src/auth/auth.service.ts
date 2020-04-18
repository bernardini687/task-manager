import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private repo: UserRepository
  ) {}

  async signup(dto: SignupCredentialsDto): Promise<void> {
    return this.repo.signup(dto);
  }

  async login(dto: LoginCredentialsDto): Promise<void> {
    const username = await this.repo.validateUser(dto);
    if (!username) {
      throw new UnauthorizedException();
    }
  }
}
