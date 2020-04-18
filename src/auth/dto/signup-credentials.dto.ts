import { IsString, Length, Matches } from 'class-validator';

export class SignupCredentialsDto {
  @IsString()
  @Length(4, 32)
  username: string;

  @IsString()
  @Length(4, 8)
  @Matches(/asdf/i, { message: 'password too weak' })
  password: string;
}
