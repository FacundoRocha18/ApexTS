import { IParseParams } from "./parse-params.interface";

export interface IParserService {
  parse(params: IParseParams): void;
}
