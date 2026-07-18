import { Injectable, Logger } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService {
  private pool: mysql.Pool;
  private readonly logger = new Logger(DatabaseService.name);

  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      database: process.env.DB_DATABASE || 'e_ticket_pro_odb',
      user: process.env.DB_USER || 'e_ticket_pro_user',
      password: process.env.DB_PASSWORD || 'r00t',
      connectionLimit: 10,
    });
    this.logger.log('Database connection pool initialized');
  }

  async executeQuery(query: string, values: any[] = []): Promise<any> {
    try {
      const [results] = await this.pool.execute(query, values);
      return results;
    } catch (error) {
      this.logger.error(`Query failed: ${query} with values ${JSON.stringify(values)}`, error);
      throw error;
    }
  }
}
