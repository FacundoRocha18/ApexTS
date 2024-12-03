export class LoggerService {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  log(message: string): void {
    console.log(`[${this.context}] LOG: ${message}`);
  }

  error(message: string): void {
    console.error(`[${this.context}] ERROR: ${message}`);
  }

  warn(message: string): void {
    console.warn(`[${this.context}] WARN: ${message}`);
  }
}