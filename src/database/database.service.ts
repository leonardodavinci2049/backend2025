import { Injectable, Logger } from '@nestjs/common';
import { createPool, Pool } from 'mysql2/promise';
import { envs } from 'src/core/config/envs';

@Injectable()
export class DatabaseService {
  // Property to hold the connection to MySQL database
  private pool: Pool;
  // Logger instance
  private readonly logger = new Logger(DatabaseService.name);

  // Call the connect method when an instance of DatabaseService is created
  constructor() {
    this.connect();
  }

  public async connect() {
    try {
      // Attempt to create a connection to MySQL
      this.pool = createPool({
        port: 3306,
        host: envs.DB_MYSQL_HOST,
        user: envs.DB_MYSQL_USER,
        password: envs.DB_MYSQL_PASSWORD,
        database: envs.DB_MYSQL_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        pool: true,
      });

      // Log a message if the connection is successful
      this.logger.log('Connected to MySQL database');

      //return await this.connection.connect();
    } catch (error) {
      // Log an error message if the connection fails
      this.logger.error(
        'Error connecting to MySQL database with mysql2',
        error.stack,
      );
    }
  }

  async closePool() {
    await this.pool.end();
  }

  async getConnection() {
    return this.pool.getConnection();
  }
}
