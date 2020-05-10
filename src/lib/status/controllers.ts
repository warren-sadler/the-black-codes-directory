/**
 * @module status.controllers
 */
import { Request, Response } from 'express';
import { BaseRequestHandler } from '../../core/';

/**
 *
 */
class GetStatus extends BaseRequestHandler {
    public async executeImpl(_req: Request, res: Response) {
        this.ok(res);
    }
}

export const getStatus = new GetStatus();
