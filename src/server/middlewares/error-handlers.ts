import { Request, Response, NextFunction} from 'express';

interface HTTPError extends Error {
    status?: number;
}

export function notFoundHandler (req: Request, res: Response, next: NextFunction) {
    const error: HTTPError = new Error(`path ${req.url} not found`);
    error.status = 404;
    next(error);
};

export function globalErrors (err: HTTPError, req: Request, res: Response, next: NextFunction) {
    res.status(err.status || 500);
    res.json({message: 'Poop, ya goofed', error: err.message});
};