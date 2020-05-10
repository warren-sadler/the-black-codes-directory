/**
 * @module src/main.ts
 *
 * Main.ts operates as the entry point to our application.
 */
import { buildApplication, startServer, configManager } from './core';
import { mountStatusRouter } from './lib/status';

const config = configManager.appendRouters(mountStatusRouter).getInstance();

const app = buildApplication(config);

startServer(app, config);
