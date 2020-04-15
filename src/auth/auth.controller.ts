import { Controller, Body, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('signup')
  async signUp(@Body() dto: AuthCredentialsDto): Promise<void> {
    return this.service.signUp(dto);
  }
}
