import { ServerResponse } from "http";

export type HttpResponse = ServerResponse & { json?: (obj: any) => void };
