import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { JwtService } from '@nestjs/jwt';
// import { JwtPayload } from 'src/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private repo: UserRepository,
    private jwtService: JwtService
  ) {}

  async signup(dto: SignupCredentialsDto): Promise<void> {
    return this.repo.signup(dto);
  }

  async login(dto: LoginCredentialsDto): Promise<{ accessToken: string }> {
    const username = await this.repo.validateUser(dto);
    if (!username) {
      throw new UnauthorizedException();
    }
    // const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.signAsync({ username });
    return { accessToken };
  }
}
