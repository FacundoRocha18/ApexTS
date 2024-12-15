import { DataSourceOptions } from 'typeorm';
import { Customer } from '../../examples/customers/customer';

export class DatabaseConfig {
	public static getDatabaseOptions(): DataSourceOptions {
		return {
			type: "postgres",
			host: "localhost",
			port: parseInt(process.env.DB_PORT || '5432'),
			username: "postgres",
			password: "Fr1810Fr!",
			database: "apexts-test",
			synchronize: true,
			logging: false,
			entities: [
				// Add your entities here
				Customer
			],
			migrations: [
				// Add your migrations here
			],
			subscribers: [
				// Add your subscribers here
			],
		};
	}
};