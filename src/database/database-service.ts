import { inject, injectable, singleton } from 'tsyringe';
import { DataSource, DataSourceOptions } from 'typeorm';
import { LoggerService } from '@logger';
import { DatabaseConfig, DatabaseEntity } from '@database';
import { Customer } from '../../examples/customers/customer';

@singleton()
@injectable()
export class DatabaseService {
	private dataSource: DataSource;

	constructor(@inject(LoggerService) private logger: LoggerService) { }

	public async initialize(
		synchronize: boolean,
		entities: DatabaseEntity[],
		migrations: any[],
		subscribers: any[],
	): Promise<void> {
		const options: DataSourceOptions = DatabaseConfig.getDatabaseOptions(synchronize, entities, migrations, subscribers);
		this.dataSource = new DataSource(options);

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