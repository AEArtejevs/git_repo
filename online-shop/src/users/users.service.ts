import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    getAll() {
        return this.prisma.user.findMany({ 
            orderBy: { id: 'asc' } 
        });
    }

    async getOne(id: number) {
        const user = await this.prisma.user.findUnique({ 
            where: { id } 
        });
        return user;
    }
    
}
