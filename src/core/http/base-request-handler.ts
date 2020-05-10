/**
 * @module core.http.base-request-handler
 */
import { Request, Response, NextFunction } from 'express';
import * as STATUS_CODES from './status-codes';

export abstract class BaseRequestHandler {
    protected abstract executeImpl(req: Request, res: Response, next?: NextFunction): Promise<void | any>;
    public static jsonResponse<T>(res: Response, status: number, message: string, payload?: T) {
        return res.status(status).json({
            status,
            message,
            payload,
        });
    }
    public async execute(req: Request, res: Response, next?: NextFunction): Promise<void> {
        try {
            this.executeImpl(req, res, next);
        } catch (executeImplError) {
            this.fail(res, executeImplError);
        }
    }

    public ok<T>(res: Response, dto?: T) {
        if (!!dto) {
            return res.status(STATUS_CODES.OK).json({
                status: STATUS_CODES.OK,
                message: 'ok',
                payload: dto,
            });
        } else {
            return res.status(STATUS_CODES.OK).json({
                status: STATUS_CODES.OK,
                message: 'ok',
            });
        }
    }
    public created(res: Response) {
        return res.sendStatus(STATUS_CODES.CREATED);
    }

    public badRequest(res: Response, message: string = 'Bad Request') {
        return res.sendStatus(STATUS_CODES.BAD_REQUEST).json({
            status: STATUS_CODES.BAD_REQUEST,
            message,
        });
    }

    public fail(res: Response, error: string | Error) {
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            status: STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
            error: error.toString(),
        });
    }
}
