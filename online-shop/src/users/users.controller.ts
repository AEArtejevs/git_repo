import { Controller, Get, Param, ParseIntPipe, Post, Body, Patch, Delete} from '@nestjs/common';
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

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() user: Partial<User>) { // ParseIntPipe converts the URL ID to a number and rejects invalid values.
        return this.usersService.update(id, user);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id);
    }
}
