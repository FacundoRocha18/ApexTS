import { HttpRequest, HttpResponse } from "@http";

export type PathVariables = { [key: string]: string };
export type QueryParams = { [key: string]: string | string[] };
export type Controller = (req: HttpRequest, res: HttpResponse) => void | Promise<void>;
