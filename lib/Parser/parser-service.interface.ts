import { ParserParams } from "../types/utils";

export interface IParserService {
  parse(params: ParserParams): void;
}
