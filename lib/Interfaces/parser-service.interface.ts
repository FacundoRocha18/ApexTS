import { ParserParams } from "../Types/utils";

export interface IParserService {
  parse(params: ParserParams): void;
}
