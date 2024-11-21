export class SerializationError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = "SerializationError";
    this.statusCode = 500;
  }
}
