import type { TRequestHandler } from "../types";

export type Route = {
  [path: string]: { [method: string]: TRequestHandler };
};
