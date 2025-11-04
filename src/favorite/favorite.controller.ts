import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { FavoriteService } from './favorite.service';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFavoriteDto: CreateFavoriteDto, @Req() req: Request) {
    const userId = (req.user as any).id;
    console.log('DTO:', createFavoriteDto);
    console.log('User ID:', userId);
    return this.favoriteService.create(createFavoriteDto, userId);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Req() req: Request) {
    const userId = (req.user as any).id;
    return this.favoriteService.findAll(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoriteService.findOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFavoriteDto: UpdateFavoriteDto,
  ) {
    return this.favoriteService.update(id, updateFavoriteDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoriteService.remove(id);
  }
}
