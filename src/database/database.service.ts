import { Injectable, Logger } from '@nestjs/common';
import { createPool, Pool, ResultSetHeader } from 'mysql2/promise';
import { envs } from 'src/core/config/envs';

@Injectable()
export class DatabaseService {
  // Property to hold the connection to MySQL database
  private poolConnection: Pool;
  // Logger instance
  private readonly logger = new Logger(DatabaseService.name);

  // Call the connect method when an instance of DatabaseService is created
  constructor() {
    this.connect();
  }

  public async connect() {
    try {
      // Attempt to create a connection to MySQL
      this.poolConnection = createPool({
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

  async selectQuery<T>(
    queryString: string,
    params?: any[],
  ): Promise<Partial<T>[]> {
    const [results] = await this.poolConnection.query(queryString, params);
    return results as T[];
  }

  async selectExecute<T>(
    queryString: string,
    params?: any[],
  ): Promise<Partial<T>[]> {
    const [results] = await this.poolConnection.execute(queryString, params);
    return results as T[];
  }

  // insert/update/delete
  // insert/update/delete
  async ModifyExecute(
    queryString: string,
    params?: any[],
  ): Promise<ResultSetHeader> {
    const [results] = await this.poolConnection.execute(queryString, params);
    return results as ResultSetHeader;
  }

  // insert/update/delete
  async ModifyQuery(
    queryString: string,
    params?: any[],
  ): Promise<ResultSetHeader> {
    const [results] = await this.poolConnection.query(queryString, params);
    return results as ResultSetHeader;
  }

  async getConnection() {
    return this.poolConnection.getConnection();
  }

  async closePool() {
    await this.poolConnection.end();
  }
}
