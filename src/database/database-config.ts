import { DataSourceOptions } from 'typeorm';
import { Customer } from '../../examples/customers/customer';

export class DatabaseConfig {
	public static getDatabaseOptions(): DataSourceOptions {
		console.log('DB_HOST', process.env.DB_HOST);
		console.log('DB_PORT', process.env.DB_PORT);
		console.log('DB_USERNAME', process.env.DB_USERNAME);
		console.log('DB_PASSWORD', process.env.DB_PASSWORD);
		console.log('DB_DATABASE', process.env.DB_DATABASE);
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