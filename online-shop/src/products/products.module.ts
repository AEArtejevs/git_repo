import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
providers: [ProductsService, { provide: PrismaService, useValue: {} }],
  controllers: [ProductsController]
})
export class ProductsModule {}
