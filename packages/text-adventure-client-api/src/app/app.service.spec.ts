import { Test } from '@nestjs/testing';
import { AppService } from './app.service';
import { getConnectionToken } from '@nestjs/typeorm';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const mockConnection = {
      query: jest.fn().mockResolvedValue([{ result: 1 }]),
    };

    const app = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getConnectionToken(),
          useValue: mockConnection,
        },
      ],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' });
    });
  });

  describe('checkDatabaseHealth', () => {
    it('should return healthy status when database is connected', async () => {
      const result = await service.checkDatabaseHealth();
      expect(result).toEqual({
        status: 'healthy',
        database: 'connected',
      });
    });
  });
});
