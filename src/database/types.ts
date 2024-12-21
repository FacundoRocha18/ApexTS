import { EntitySchema } from "typeorm";

export { DatabaseInitializationException } from "./database-initialization-exception";

export type DatabaseEntity = string | Function | EntitySchema<any>;
export type DatabaseConfigParameters = {
  synchronize: boolean;
  entities: DatabaseEntity[];
  migrations: any[];
  subscribers: any[];
};
