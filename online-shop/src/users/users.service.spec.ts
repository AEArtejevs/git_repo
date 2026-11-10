import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: PrismaService, useValue: {} }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

// GET USER ===============================================================================

    it('getAll returns all users', async () => {
    // Arrange
    const users = [
      { id: 1, name: 'Anna', email: 'anna@example.com' },
      { id: 2, name: 'Janis', email: 'janis@example.com' },
    ];
    const fakePrisma = { user: { findMany: async () => users } };
    const service = new UsersService(fakePrisma as unknown as PrismaService);

    // Act
    const result = await service.getAll();

    // Assert
    expect(result).toEqual(users);
  });

    it('getOne returns a user by ID', async () => {
    // Arrange
    const user = { id: 1, name: 'Anna', email: 'anna@example.com' };
    const fakePrisma = { user: { findUnique: async () => user } };
    const service = new UsersService(fakePrisma as unknown as PrismaService);

    // Act
    const result = await service.getOne(1);

    // Assert
    expect(result).toEqual(user);
  });

  it('getOne returns null when user does not exist', async () => {
    // Arrange
    const fakePrisma = { user: { findUnique: async () => null } };
    const service = new UsersService(fakePrisma as unknown as PrismaService);

    // Act
    const result = await service.getOne(999);

    // Assert
    expect(result).toBeNull();
  });
  
// ========================================================================================

// CREATE USER ============================================================================

  it('create adds a new user', async () => {
    // Arrange
    const newUser = { name: 'Anna', email: 'anna@example.com' };
    const fakePrisma = { user: { create: async () => ({ id: 1, ...newUser }) } };
    const service = new UsersService(fakePrisma as unknown as PrismaService);

    // Act
    const result = await service.create(newUser);

    // Assert
    expect(result).toEqual({ id: 1, ...newUser });
  });

// ========================================================================================
});
