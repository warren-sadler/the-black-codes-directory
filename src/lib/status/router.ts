/**
 *
 * @module status.router
 */
import { Application, Router } from 'express';
import * as statusControllers from './controllers';

/**
 *
 * @param app
 */
export function mountStatusRouter(app: Application) {
    const statusRouter = Router();
    statusRouter.get('/', (req, res) => statusControllers.getStatus.execute(req, res));
    app.use('/api/v1/status', statusRouter);
}
