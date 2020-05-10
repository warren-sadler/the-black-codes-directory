/**
 * @module core.configuration
 * @author Warren Sadler {warrendsadler@gmail.com}
 *
 * This module describes the default configuration of
 * The Black Codes directory along with a set of utilities
 * for interacting with the configuration object.
 */
import express from 'express';
import winston from 'winston';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import { logger } from '../logger';

export type NODE_ENV = 'development' | 'test' | 'staging' | 'production';

export interface IServerLifeCycleFn {
    (config: IConfig): any | void | Promise<any | void>;
}
export interface IApplicationRouter {
    (application: express.Application): any | void | Promise<any | void>;
}

export interface IConfig {
    PORT: number;
    NODE_ENV: NODE_ENV;
    BEFORE_SERVER_START_FNS: IServerLifeCycleFn[];
    AFTER_SERVER_START_FNS: IServerLifeCycleFn[];
    MIDDLEWARE: express.RequestHandler[];
    ROUTERS: IApplicationRouter[];
    LOGGER: winston.Logger | Console;
}

export const defaultConfiguration: IConfig = {
    PORT: ((process.env.PORT as unknown) as number) || 8000,
    NODE_ENV: (process.env.NODE_ENV as NODE_ENV) || 'development',
    BEFORE_SERVER_START_FNS: [],
    AFTER_SERVER_START_FNS: [
        ({ LOGGER, PORT }) => {
            LOGGER.info(`Application @http://localhost:${PORT} 🚀`);
        },
    ],
    MIDDLEWARE: [helmet(), cors(), morgan('combined'), compression()],
    ROUTERS: [
        (app) => {
            app.get('/', (req, res) => res.sendStatus(200));
        },
    ],
    LOGGER: logger,
};

export interface IConfigManager {
    config: IConfig;
    getInstance: () => IConfig;
    appendAfterServerStartFns: (...fns: IServerLifeCycleFn[]) => IConfigManager;
    appendBeforeServerStartFns: (...fns: IServerLifeCycleFn[]) => IConfigManager;
    appendMiddleware: (...middleware: express.RequestHandler[]) => IConfigManager;
    appendRouters: (...routers: IApplicationRouter[]) => IConfigManager;
}

export const configManager: IConfigManager = {
    config: defaultConfiguration,
    getInstance(): IConfig {
        return this.config;
    },
    appendBeforeServerStartFns(...fns: IServerLifeCycleFn[]) {
        this.config = {
            ...this.config,
            BEFORE_SERVER_START_FNS: [...this.config.BEFORE_SERVER_START_FNS, ...fns],
        };
        return this;
    },
    appendAfterServerStartFns(...fns: IServerLifeCycleFn[]) {
        this.config = {
            ...this.config,
            AFTER_SERVER_START_FNS: [...this.config.AFTER_SERVER_START_FNS, ...fns],
        };
        return this;
    },
    appendMiddleware(...middleware: express.RequestHandler[]) {
        this.config = {
            ...this.config,
            MIDDLEWARE: [...this.config.MIDDLEWARE, ...middleware],
        };
        return this;
    },
    appendRouters(...routers: IApplicationRouter[]) {
        this.config = {
            ...this.config,
            ROUTERS: [...this.config.ROUTERS, ...routers],
        };
        return this;
    },
};

export default configManager;
