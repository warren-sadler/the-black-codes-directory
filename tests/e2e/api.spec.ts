/**
 * @module api.spec.ts
 *
 * Tests to assert the top-level api of The Black Codes Directory
 */
import supertest from 'supertest';
import { testApp } from '../setup';

const theBlackCodesDirectoryApi = supertest(testApp);

describe('The Black Codes Directory API', () => {
    describe('GET /', () => {
        it('returns a 200 status-code', (done) => {
            theBlackCodesDirectoryApi.get('/').expect(200, () => done());
        });
    });
});
