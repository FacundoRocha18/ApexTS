import { EntitySchema } from 'typeorm';

export type DatabaseEntity = string | Function | EntitySchema<any>;
