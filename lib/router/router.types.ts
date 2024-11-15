import type { RequestHandler } from "../types";

export type Route = {
  [path: string]: { [method: string]: RequestHandler };
};
