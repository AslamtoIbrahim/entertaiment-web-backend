import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFavoriteDto {
  @IsString()
  title: string;

  @IsString()
  date: string;

  @IsString()
  language: string;

  @IsString()
  path: string;

  @IsString()
  type: string;
}
