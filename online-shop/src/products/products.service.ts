import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    getAll(): Product[] {
        return this.products;
    }

    getOne(id: number): Product | undefined {
        return this.products.find(product => product.id === id);
    }

    create(product: Product): Product {
        product.id = this.products.length + 1;
        this.products.push(product);
        return product;
    }
}
