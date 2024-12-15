import { inject, injectable, singleton } from 'tsyringe';
import { DataSource } from 'typeorm';
import { LoggerService } from '@logger';
import { DatabaseConfig } from './database-config';

@singleton()
@injectable()
export class DatabaseService {
	private dataSource: DataSource;

	constructor(
		@inject(LoggerService) private logger: LoggerService,
	) {
		this.dataSource = new DataSource(DatabaseConfig.getDatabaseOptions());
	}

	public async initialize(): Promise<void> {
		if (!this.dataSource.isInitialized) {
			await this.dataSource.initialize();
			this.logger.log('Database connected.');
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
			this.logger.log('Database connection closed.');
		}
	}
}