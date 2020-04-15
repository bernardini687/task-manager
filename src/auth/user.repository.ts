import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common/exceptions';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(dto: AuthCredentialsDto): Promise<void> {
    try {
      await this.create(dto).save();
    } catch (e) {
      // query failed error
      if (e.code === '23505') {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
