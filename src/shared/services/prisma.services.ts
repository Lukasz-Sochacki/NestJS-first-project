import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/extension';

//Initiate connection with database
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
