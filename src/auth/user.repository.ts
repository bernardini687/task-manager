import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import {
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signup(dto: SignupCredentialsDto): Promise<void> {
    try {
      const salt = await bcrypt.genSalt();
      dto = {
        username: dto.username,
        password: await bcrypt.hash(dto.password, salt),
      };
      await this.create({ salt, ...dto }).save();
    } catch (e) {
      // query failed error
      if (e.code === '23505') {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUser(dto: LoginCredentialsDto): Promise<string> {
    const user = await this.findOne({ username: dto.username });
    if (user && (await user.validatePwd(dto.password))) {
      return user.username;
    } else {
      return null;
    }
  }
}
