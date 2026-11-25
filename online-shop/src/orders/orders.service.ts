import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Order } from './order.entity';

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

    create(order: Pick<Order, 'userId' | 'total' | 'items'>) {
        return this.prisma.order.create({
            data: {
                userId: order.userId,
                total: order.total,
                items: {
                    create: order.items.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            },
            include: { user: true, items: { include: { product: true } } },
        });
    }


}
