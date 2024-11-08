export class MiddlewareError extends Error {
  public status: number;
  public stack: string;

  constructor(message: string, status: number, stack?: string) {
    super(message);
    this.status = status;
    this.stack = stack;
  }
}
