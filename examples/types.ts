import { Controller } from "../lib/types";
import { HttpMethod } from "../lib/types";

export type Route = {
  method: HttpMethod;
  path: string;
  handler: Controller;
};

export interface Module {
  routes: any;
  controllers: any[];
  providers: any[];
}
