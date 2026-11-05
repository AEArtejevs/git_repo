import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
    private products: Product[] = [];
    
}
