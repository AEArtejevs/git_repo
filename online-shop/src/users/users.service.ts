import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './user.entity';
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

    create(user: Pick<User, 'name' | 'email'>) {
        return this.prisma.user.create({
            data: user
        });
    }


    update(id: number, user: Partial<Pick<User, 'name' | 'email'>>) {
        return this.prisma.user.update({
            where: { id },
            data: user
        });
    }

    
}
