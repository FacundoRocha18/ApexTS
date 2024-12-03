export class LoggerService {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  log(message: string): void {
    console.log(`[${new Date().toISOString()}] [${this.context}] LOG: ${message}`);
  }

  error(message: string): void {
    console.error(`[${new Date().toISOString()}] [${this.context}] ERROR: ${message}`);
  }

  warn(message: string): void {
    console.warn(`[${new Date().toISOString()}] [${this.context}] WARN: ${message}`);
  }
}