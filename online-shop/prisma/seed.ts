import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
    // Empty all tables and restart ids. Order tables point to User and Product, so they must be emptied together.
    await prisma.$executeRaw`TRUNCATE "OrderItem", "Order", "Product", "User" RESTART IDENTITY`;

    await prisma.product.createMany({
        data: [
            { name: 'Wireless Mouse', price: 1999, stock: 25 },
            { name: 'Mechanical Keyboard', price: 7999, stock: 10 },
            { name: 'USB-C Cable', price: 899, stock: 100 },
            { name: 'Laptop Stand', price: 3499, stock: 15 },
            { name: 'Webcam', price: 5999, stock: 0 },
        ],
    });

    await prisma.user.createMany({
        data: [
            { name: 'Anna Berzina', email: 'anna@example.com' },
            { name: 'Janis Ozols', email: 'janis@example.com' },
            { name: 'Liga Kalnina', email: 'liga@example.com' },
        ],
    });

    // Anna (user 1) paid for 2 mice and 1 cable.
    await prisma.order.create({
        data: {
            userId: 1,
            status: 'PAID',
            total: 4897, // 2 x 1999 + 1 x 899
            items: {
                create: [
                    { productId: 1, quantity: 2, price: 1999 },
                    { productId: 3, quantity: 1, price: 899 },
                ],
            },
        },
    });

    // Janis (user 2) ordered 1 keyboard but has not paid yet.
    await prisma.order.create({
        data: {
            userId: 2,
            total: 7999, // 1 x 7999
            items: {
                create: [{ productId: 2, quantity: 1, price: 7999 }],
            },
        },
    });

}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(() => prisma.$disconnect());