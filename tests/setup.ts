import { buildApplication, configManager } from '../src/core';
import { mountStatusRouter } from '../src/lib/status';

const config = configManager.appendRouters(mountStatusRouter).getInstance();
export const testApp = buildApplication(config);
