import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from './database.module';

describe('DatabaseModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    // Mock TypeORM module to avoid actual database connection in tests
    const mockTypeOrmModule = {
      module: class MockTypeOrmModule {},
      providers: [],
      exports: [],
    };

    module = await Test.createTestingModule({
      imports: [DatabaseModule],
    })
      .overrideModule(DatabaseModule)
      .useModule(mockTypeOrmModule)
      .compile();
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
