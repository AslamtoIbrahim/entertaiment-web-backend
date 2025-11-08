import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
// import { PrismaClient } from 'generated/prisma/client';


@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect()
      .then(() => console.log('DB Connected'))
      .catch((err) => console.log(err));
  }
}
