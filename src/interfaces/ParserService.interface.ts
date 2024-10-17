import { ParserParams } from "../types";

export interface IParserService {
  parse(params: ParserParams): void;
}
