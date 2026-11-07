import { Controller, Get, Param, ParseIntPipe, Post, Body} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    getAll() {
        return this.usersService.getAll();
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.getOne(id);
    }

    @Post()
    create(@Body() user: User) {
        return this.usersService.create(user);
    }
}
