import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Get()
    getAll() {
        return this.ordersService.getAll();
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.ordersService.getOne(id);
    }

    @Post()
    create(@Body() order: Order) {
        return this.ordersService.create(order);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() order: Partial<Pick<Order, 'status' | 'total'>>) {
        return this.ordersService.update(id, order);
    }

}
