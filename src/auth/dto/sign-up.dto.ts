import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @IsString()
  @IsOptional()
  image?: string;
}
