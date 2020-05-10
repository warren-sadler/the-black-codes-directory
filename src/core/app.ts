/**
 * @module core.app
 *
 * This module defines the core Express application routers, middleware, and
 * instance generation.
 */

import express, { Application } from 'express';
import { IConfig } from './configuration';

/**
 *
 * @param config
 */
export function buildApplication(config: IConfig): Application {
    const app = express();
    config.MIDDLEWARE.forEach((middleware) => {
        app.use(middleware);
    });
    config.ROUTERS.forEach((router) => {
        router(app);
    });
    return app;
}
