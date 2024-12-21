import { inject, injectable, singleton } from "tsyringe";
import { DataSource, DataSourceOptions } from "typeorm";
import { LoggerService } from "@logger";
import { DatabaseConfig, DatabaseConfigParameters } from "@database";

@singleton()
@injectable()
export class DatabaseService {
  private dataSource: DataSource;

  constructor(@inject(LoggerService) private logger: LoggerService) {}

  public async initialize(parameters: DatabaseConfigParameters): Promise<void> {
    const options: DataSourceOptions = DatabaseConfig.getDatabaseOptions(parameters);
    this.dataSource = new DataSource(options);

    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
      this.logger.log("Database connected.");
    }
  }

  public getDataSource(): DataSource {
    if (!this.dataSource.isInitialized) {
      throw new Error('Database not initialized. Call the "initialize" method first.');
    }
    return this.dataSource;
  }

  public async close(): Promise<void> {
    if (this.dataSource.isInitialized) {
      await this.dataSource.destroy();
      this.logger.log("Database connection closed.");
    }
  }
}
