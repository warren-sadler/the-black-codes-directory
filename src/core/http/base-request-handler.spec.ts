import { Request, Response } from 'express';
import { BaseRequestHandler } from './base-request-handler';

describe('BaseRequestHandler', () => {
    describe('extending it to build controllers', () => {
        test('it throws an error when executeImpl is not defined', () => {
            class TestController extends BaseRequestHandler {
                protected executeImpl(req: Request, res: Response): Promise<any> {
                    throw new Error('Method not implemented.');
                }
            }
            let testController = new TestController();
            testController.fail = jest.fn();
            testController.execute({} as Request, {} as Response);
            expect(testController.fail).toHaveBeenCalled();
        });
    });
});
