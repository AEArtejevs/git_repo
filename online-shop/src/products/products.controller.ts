import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    getAll() {
        return this.productsService.getAll();
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.getOne(id);
    }

    @Post()
    create(@Body() product: Product) {
        return this.productsService.create(product);
    }
}
