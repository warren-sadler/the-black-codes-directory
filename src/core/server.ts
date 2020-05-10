/**
 * @module core.server
 */
import http from 'http';
import { Application } from 'express';
import { IConfig } from './configuration';

/**
 *
 * @param app {Application}
 * @param config {IConfig}
 */
export function startServer(app: Application, config: IConfig) {
    const server = http.createServer(app);
    config.BEFORE_SERVER_START_FNS.forEach((fn) => {
        fn(config);
    });
    server.listen(config.PORT, () => {
        config.AFTER_SERVER_START_FNS.forEach((fn) => {
            fn(config);
        });
    });
}
