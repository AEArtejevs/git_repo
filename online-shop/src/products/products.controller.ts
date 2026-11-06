import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
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

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() product: Partial<Product>) { // ParseIntPipe converts the URL ID to a number and rejects invalid values.
        return this.productsService.update(id, product);
    }
}
