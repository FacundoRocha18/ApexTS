import { injectable, singleton } from 'tsyringe';

@singleton()
@injectable()
export class LoggerService {
	constructor() { }

	log(message: string): void {
		console.log(`[ApexLoggerService] LOG: ${message}`);
	}

	error(message: string): void {
		console.error(`[ApexLoggerService] ERROR: ${message}`);
	}

	warn(message: string): void {
		console.warn(`[ApexLoggerService] WARN: ${message}`);
	}
}