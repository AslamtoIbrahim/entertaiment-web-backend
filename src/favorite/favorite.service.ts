import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateFavoriteDto, userId: string) {
    const favorite = await this.prisma.favorite.create({
      data: {
        userId,
        title: dto.title,
        date: dto.date,
        language: dto.language,
        path: dto.path,
        type: dto.type,
      },
    });
    return favorite;
  }

  async findAll(userId: string) {
    const favorites = await this.prisma.favorite.findMany({
      where: {
        userId,
      },
    });
    return favorites;
  }

  async findOne(id: string) {
    const favorite = await this.prisma.favorite.findUnique({
      where: {
        id,
      },
    });
    return favorite;
  }

  async update(id: string, dto: UpdateFavoriteDto) {
    const favorite = await this.prisma.favorite.update({
      where: {
        id,
      },
      data: {
        title: dto.title,
        date: dto.date,
        language: dto.language,
        path: dto.path,
        type: dto.type,
      },
    });
    return favorite;
  }

  remove(id: string) {
    const favorite = this.prisma.favorite.delete({
      where: {
        id,
      },
    });
    return favorite;
  }
}
