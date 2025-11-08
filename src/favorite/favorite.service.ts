import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { PrismaService } from 'prisma/prisma.service';

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
    if (!favorite) {
      throw new NotFoundException(`Favorite did not added successfully`);
    }
    return favorite;
  }

  async findAll(userId: string, limit: string, search: string, cursor: string) {
    const take = parseInt(limit) || 6;
    const favorites = await this.prisma.favorite.findMany({
      take,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      where: {
        AND: [
          { userId },
          search
            ? {
                title: { contains: search, mode: 'insensitive' },
              }
            : {},
        ],
      },
      orderBy: { id: 'desc' },
    });
    if (!favorites || favorites.length === 0) {
      return [];
    }
    return favorites;
  }

  // async findOne(id: string) {
  //   const favorite = await this.prisma.favorite.findUnique({
  //     where: {
  //       id,
  //     },
  //   });
  //   return favorite;
  // }

  async findOneByTitle(userId: string, title: string) {
    const favorite = await this.prisma.favorite.findFirst({
      where: {
        AND: [{ userId }, { title }],
      },
    });
    // if (!favorite) {
    //   throw new NotFoundException(
    //     `Favorite with title ${title} not found for this user`,
    //   );
    // }
    return favorite;
  }

  async update(userId: string, id: string, dto: UpdateFavoriteDto) {
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

    if (!favorite) {
      throw new NotFoundException(
        `Favorite with id ${id} not found for this user`,
      );
    }
    return favorite;
  }

  async remove(id: string) {
    const favorite = await this.prisma.favorite.delete({
      where: {
        id,
      },
    });
    if (!favorite) {
      throw new NotFoundException(
        `Can not removefFavorite with id ${id}`,
      );
    }
    return favorite;
  }
}
