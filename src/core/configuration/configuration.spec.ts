import applicationConfigManager, { defaultConfiguration } from './index';

describe('Application Configuration', () => {
    describe('defaultConfiguration', () => {
        it('has a PORT property, that is a number', () => {
            expect(typeof defaultConfiguration.PORT).toBe('number');
        });
        it('has a NODE_ENV property which is bound to process.env.NODE_ENV', () => {
            expect(defaultConfiguration.NODE_ENV).toBe('test');
        });
    });
    describe('applicationConfigManager', () => {
        describe('#getInstance', () => {
            it('returns, by default, a config identical to defaultConfig', () => {
                const config = applicationConfigManager.getInstance();
                expect(config).toEqual(defaultConfiguration);
            });
        });
        it('supports add new routers via #appendRouters', () => {
            const config = applicationConfigManager
                .appendRouters(
                    (_app) => void 0,
                    (_app) => void 0,
                )
                .getInstance();
            expect(config.ROUTERS).toHaveLength(3);
        });
    });
});
