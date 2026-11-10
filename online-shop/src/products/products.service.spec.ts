import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, { provide: PrismaService, useValue: {} }],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

// GET PRODUCTS ===============================================================================

    it('getAll returns all products', async () => {
    // Arrange
    const products = [
      { id: 1, name: 'Laptop', price: 1000, stock: 5 },
      { id: 2, name: 'Phone', price: 500, stock: 10 },
    ];
    const fakePrisma = { product: { findMany: async () => products } };
    const service = new ProductsService(fakePrisma as unknown as PrismaService);

    // Act
    const result = await service.getAll();

    // Assert
    expect(result).toEqual(products);
  });

    it('getOne returns a product by ID', async () => {
    // Arrange
    const product = { id: 1, name: 'Laptop', price: 100000, stock: 5 };
    const fakePrisma = { product: { findUnique: async () => product } };
    const service = new ProductsService(fakePrisma as unknown as PrismaService);

    // Act
    const result = await service.getOne(1);

    // Assert
    expect(result).toEqual(product);
  });

  it('getOne returns null when product does not exist', async () => {
    // Arrange
    const fakePrisma = { product: { findUnique: async () => null } };
    const service = new ProductsService(fakePrisma as unknown as PrismaService);

    // Act
    const result = await service.getOne(999);

    // Assert
    expect(result).toBeNull();
  });

});