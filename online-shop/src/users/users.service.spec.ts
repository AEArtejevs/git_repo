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
  
});
