import { Request, Response } from '../types'

export interface IMiddlewares {
	logger(req: Request, res: Response, next: () => void): void
	auth(req: Request, res: Response, next: () => void): void
}