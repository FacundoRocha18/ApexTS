import { ParserParams } from '../types';

export interface IParser {
  parseBody(params: ParserParams): void;
}
