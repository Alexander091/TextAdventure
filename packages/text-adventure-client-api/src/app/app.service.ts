import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async checkDatabaseHealth(): Promise<{ status: string; database: string }> {
    try {
      await this.connection.query('SELECT 1');
      return {
        status: 'healthy',
        database: 'connected',
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        database: 'disconnected',
      };
    }
  }
}
