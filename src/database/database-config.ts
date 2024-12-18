import { DataSourceOptions } from 'typeorm';
import { Customer } from '../../examples/customers/customer';

export class DatabaseConfig {
	public static getDatabaseOptions(): DataSourceOptions {
		return {
			type: "postgres",
			host: process.env.DB_HOST as string,
			port: parseInt(process.env.DB_PORT as string),
			username: process.env.DB_USERNAME as string,
			password: process.env.DB_PASSWORD as string,
			database: process.env.DB_DATABASE as string,
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