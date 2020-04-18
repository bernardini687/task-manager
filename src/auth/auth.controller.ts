import { Controller, Body, Post, ValidationPipe } from '@nestjs/common';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('/signup')
  async signup(@Body(ValidationPipe) dto: SignupCredentialsDto): Promise<void> {
    return this.service.signup(dto);
  }

  @Post('/login')
  async login(@Body(ValidationPipe) dto: LoginCredentialsDto): Promise<void> {
    return this.service.login(dto);
  }
}
