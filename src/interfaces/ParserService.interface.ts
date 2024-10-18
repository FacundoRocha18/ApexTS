import { ParserParams } from "../Models/types";

export interface IParserService {
  parse(params: ParserParams): void;
}
