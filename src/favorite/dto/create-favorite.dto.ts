import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  language: string;

  @ApiProperty()
  path: string;

  @ApiProperty()
  type: string;
}
