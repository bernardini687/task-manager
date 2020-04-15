import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private repo: UserRepository
  ) {}

  async signUp(dto: AuthCredentialsDto): Promise<void> {
    return this.repo.signUp(dto);
  }
}
