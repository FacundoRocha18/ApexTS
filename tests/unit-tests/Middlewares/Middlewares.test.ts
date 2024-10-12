// middlewares.test.ts
import { IncomingMessage, ServerResponse } from 'http';
import { Middleware } from '../../../src/types';

describe('Middlewares', () => {
    describe('Logger Middleware', () => {
        it('should log the request method and URL', () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
            const loggerMiddleware: Middleware = (req, res, next) => {
                console.log(`${req.method} ${req.url}`);
                next();
            };

            const req = {
                method: 'GET',
                url: '/test'
            } as IncomingMessage;

            const res = {} as ServerResponse;
            const next = jest.fn();

            loggerMiddleware(req, res, next);

            expect(consoleSpy).toHaveBeenCalledWith('GET /test');
            expect(next).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });
    });

    describe('Auth Middleware', () => {
        it('should call next() if authorization is valid', () => {
            const authMiddleware: Middleware = (req, res, next) => {
                const authHeader = req.headers['authorization'];
                if (authHeader === 'Bearer valid-token') {
                    next();
                } else {
                    res.statusCode = 401;
                    res.end('Unauthorized');
                }
            };

            const req = {
                method: 'GET',
                url: '/protected',
                headers: {
                    'authorization': 'Bearer valid-token'
                }
            } as IncomingMessage;

            const res = {
                statusCode: 200,
                end: jest.fn()
            } as unknown as ServerResponse;

            const next = jest.fn();

            authMiddleware(req, res, next);

            expect(next).toHaveBeenCalled();
            expect(res.end).not.toHaveBeenCalled();
        });

        it('should respond with 401 if authorization is invalid', () => {
            const authMiddleware: Middleware = (req, res, next) => {
                const authHeader = req.headers['authorization'];
                if (authHeader === 'Bearer valid-token') {
                    next();
                } else {
                    res.statusCode = 401;
                    res.end('Unauthorized');
                }
            };

            const req = {
                method: 'GET',
                url: '/protected',
                headers: {
                    'authorization': 'Bearer invalid-token'
                }
            } as IncomingMessage;

            const res = {
                statusCode: 200,
                end: jest.fn()
            } as unknown as ServerResponse;

            const next = jest.fn();

            authMiddleware(req, res, next);

            expect(next).not.toHaveBeenCalled();
            expect(res.statusCode).toBe(401);
            expect(res.end).toHaveBeenCalledWith('Unauthorized');
        });
    });
});
