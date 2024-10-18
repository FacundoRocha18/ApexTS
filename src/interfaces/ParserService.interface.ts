import { ParserParams } from "../Types/main";

export interface IParserService {
  parse(params: ParserParams): void;
}
