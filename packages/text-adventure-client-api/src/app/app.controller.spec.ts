import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getConnectionToken } from '@nestjs/typeorm';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    const mockConnection = {
      query: jest.fn().mockResolvedValue([{ result: 1 }]),
    };

    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: getConnectionToken(),
          useValue: mockConnection,
        },
      ],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({ message: 'Hello API' });
    });
  });

  describe('checkDatabaseHealth', () => {
    it('should return database health status', async () => {
      const appController = app.get<AppController>(AppController);
      const result = await appController.checkDatabaseHealth();
      expect(result).toEqual({
        status: 'healthy',
        database: 'connected',
      });
    });
  });
});
