import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
    // Empty the table and restart ids, so product 1 is always the same product.
    await prisma.$executeRaw`TRUNCATE "Product" RESTART IDENTITY`;

    await prisma.product.createMany({
        data: [
            { name: 'Wireless Mouse', price: 1999, stock: 25 },
            { name: 'Mechanical Keyboard', price: 7999, stock: 10 },
            { name: 'USB-C Cable', price: 899, stock: 100 },
            { name: 'Laptop Stand', price: 3499, stock: 15 },
            { name: 'Webcam', price: 5999, stock: 0 },
        ],
    });
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(() => prisma.$disconnect());