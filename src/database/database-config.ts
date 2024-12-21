import { DataSourceOptions } from "typeorm";
import { DatabaseConfigParameters } from "@database";

export class DatabaseConfig {
  public static getDatabaseOptions(parameters: DatabaseConfigParameters): DataSourceOptions {
    return {
      type: "postgres",
      host: process.env.DB_HOST as string,
      port: parseInt(process.env.DB_PORT as string),
      username: process.env.DB_USERNAME as string,
      password: process.env.DB_PASSWORD as string,
      database: process.env.DB_DATABASE as string,
      synchronize: parameters.synchronize,
      logging: false,
      entities: parameters.entities,
      migrations: parameters.migrations,
      subscribers: parameters.subscribers,
    };
  }
}
