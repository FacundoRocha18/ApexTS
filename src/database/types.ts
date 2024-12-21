import { EntitySchema } from "typeorm";

export type DatabaseEntity = string | Function | EntitySchema<any>;
export type DatabaseConfigParameters = {
  synchronize: boolean;
  entities: DatabaseEntity[];
  migrations: any[];
  subscribers: any[];
};
