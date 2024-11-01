import type { TRequestHandler } from "../types";

export type TRouteDefinition = {
  [path: string]: { [method: string]: TRequestHandler };
};
