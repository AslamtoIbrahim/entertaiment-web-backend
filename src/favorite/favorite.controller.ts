import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
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
  create(@Body() createFavoriteDto: CreateFavoriteDto, @Req() req) {
    try {
      const user = req.user;
      if (!user) throw new UnauthorizedException();
      const userId: string = user.userId;
      return this.favoriteService.create(createFavoriteDto, userId);
    } catch (error) {
      console.log('error: ', error);
      throw new HttpException(
        'Failed to post new favorite',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Req() req,
    @Query('limit') limit: string,
    @Query('search') search: string,
    @Query('cursor') cursor: string,
  ) {
    try {
      const user = req.user;
      if (!user) throw new UnauthorizedException();
      const userId: string = user.userId;
      return this.favoriteService.findAll(userId, limit, search, cursor);
    } catch (error) {
      console.log('error: ', error);
      throw new HttpException(
        'Failed to get favorites',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // @HttpCode(HttpStatus.OK)
  // @UseGuards(JwtAuthGuard)
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.favoriteService.findOne(id);
  // }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get('one')
  findOneByTitle(@Req() req, @Query('title') title: string) {
    try {
      const user = req.user;
      if (!user) throw new UnauthorizedException();
      const userId: string = user.userId;
      // console.log('userId findOneByTitle : ',userId)
      return this.favoriteService.findOneByTitle(userId, title);
    } catch (error) {
      console.log('error: ', error);
      throw new HttpException(
        'Failed to get favorite by title',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateFavoriteDto: UpdateFavoriteDto,
  ) {
    try {
      const user = req.user;
      if (!user) throw new UnauthorizedException();
      const userId: string = user.userId;

      return this.favoriteService.update(userId, id, updateFavoriteDto);
    } catch (error) {
      console.log('error: ', error);
      throw new HttpException(
        'Failed to update favorite',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Req() req, @Param('id') id: string) {
    try {
      // const user = req.user;
      // if (!user) throw new UnauthorizedException();
      // const userId: string = user.userId;
      return await this.favoriteService.remove(id);
    } catch (error) {
      console.log('error: ', error);
      throw new HttpException(
        'Failed to remove favorite',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
