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

  it('getAll returns all users', async () => {
    // Arrange
    const users = [
      { id: 1, name: 'Anna', email: 'anna@example.com' },
      { id: 2, name: 'Janis', email: 'janis@example.com' },
    ];
    const fakeService = { getAll: jest.fn(async () => users) };
    const controller = new UsersController(fakeService as unknown as UsersService);

    // Act
    const result = await controller.getAll();

    // Assert
    expect(fakeService.getAll).toHaveBeenCalled();
    expect(result).toEqual(users);
  });

  it('getOne returns null when user does not exist', async () => {
    // Arrange
    const fakeService = { getOne: jest.fn(async () => null) };
    const controller = new UsersController(fakeService as unknown as UsersService);

    // Act
    const result = await controller.getOne(999);

    // Assert
    expect(fakeService.getOne).toHaveBeenCalledWith(999);
    expect(result).toBeNull();
  });

// ========================================================================================
});
