import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
    constructor(private readonly prisma: PrismaService) { }

    getAll() {
        return this.prisma.order.findMany({
            orderBy: { id: 'asc' },
            include: { user: true, items: { include: { product: true } } },
        });
    }

    getOne(id: number) {
        return this.prisma.order.findUnique({
            where: { id },
            include: { user: true, items: { include: { product: true } } },
        });
    }
}

