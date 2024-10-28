import { ParserParams } from "../Types/Utils";

export interface IParserService {
  parse(params: ParserParams): void;
}
