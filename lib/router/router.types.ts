import type { Controller } from "../types";

export type Route = {
  [path: string]: { [method: string]: Controller };
};
