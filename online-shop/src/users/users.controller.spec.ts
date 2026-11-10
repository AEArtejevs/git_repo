import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, { provide: PrismaService, useValue: {} }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // GET USER ===============================================================================

  it('getOne asks the service for the right user', async () => {
    // Arrange
    const user = { id: 1, name: 'Anna', email: 'anna@example.com' };
    const fakeService = { getOne: jest.fn(async () => user) };
    const controller = new UsersController(fakeService as unknown as UsersService);

    // Act
    const result = await controller.getOne(1);

    // Assert
    expect(fakeService.getOne).toHaveBeenCalledWith(1);
    expect(result).toEqual(user);
  });

  
});
