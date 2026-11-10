import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService, { provide: PrismaService, useValue: {} }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

// GET PRODUCT ===============================================================================

  it('getOne asks the service for the right product', async () => {
    // Arrange
    const product = { id: 1, name: 'Product A', price: 1099, stock: 5 }; // Database price is in cents to avoid floating point issues. This issue: 0.1 + 0.2 = 0.30000000000000004
    const fakeService = { getOne: jest.fn(async () => product) };
    const controller = new ProductsController(fakeService as unknown as ProductsService);

    // Act
    const result = await controller.getOne(1);

    // Assert
    expect(fakeService.getOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(product);
  });

  it('getAll returns all products', async () => {
    // Arrange
    const products = [
      { id: 1, name: 'Product A', price: 1099, stock: 5 },
      { id: 2, name: 'Product B', price: 1599, stock: 10 },
    ];
    const fakeService = { getAll: jest.fn(async () => products) };
    const controller = new ProductsController(fakeService as unknown as ProductsService);

    // Act
    const result = await controller.getAll();

    // Assert
    expect(fakeService.getAll).toHaveBeenCalled();
    expect(result).toEqual(products);
  });

  it('getOne returns null when product does not exist', async () => {
    // Arrange
    const fakeService = { getOne: jest.fn(async () => null) };
    const controller = new ProductsController(fakeService as unknown as ProductsService);

    // Act
    const result = await controller.getOne(999);

    // Assert
    expect(fakeService.getOne).toHaveBeenCalledWith(999);
    expect(result).toBeNull();
  });

// ===========================================================================================

// CREATE PRODUCT ============================================================================

  it('create passes the new product to the service', async () => {
    // Arrange
    const newProduct = { name: 'New Product', price: 1999, stock: 15 };
    const fakeService = { create: jest.fn(async () => ({ id: 4, ...newProduct })) };
    const controller = new ProductsController(fakeService as unknown as ProductsService);

    // Act
    const result = await controller.create(newProduct as Product);

    // Assert
    expect(fakeService.create).toHaveBeenCalledWith(newProduct);
    expect(result).toEqual({ id: 4, ...newProduct });
  });

// ===========================================================================================

});