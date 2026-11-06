import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

    getAll() {
        return this.prisma.product.findMany({ 
            orderBy: { id: 'asc' } 
        });
    }


    async getOne(id: number) {
        const product = await this.prisma.product.findUnique({ 
            where: { id } 
        });
        return product;
    }

    create(product: Pick<Product, 'name' | 'price' | 'stock'>) {
        return this.prisma.product.create({
            data: product
        });
    }

    update(id: number, product: Partial<Pick<Product, 'name' | 'price' | 'stock'>>) {
        return this.prisma.product.update({
            where: { id },
            data: product
        });
    }
}
