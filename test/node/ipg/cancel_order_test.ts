import Dana from 'dana-node-api-client';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { fail } from 'assert';
import { getRequest } from '../helper/util';
import { assertResponse, assertFailResponse } from '../helper/assertion';

dotenv.config();

const titleCase = 'CancelOrder';
const jsonPathFile = path.resolve(__dirname, '../../../resource/request/components/IPG.json');

const dana = new Dana({
    partnerId: process.env.X_PARTNER_ID || '',
    privateKey: process.env.PRIVATE_KEY || '',
    origin: process.env.ORIGIN || '',
    env: process.env.ENV || 'sandbox',
});

function generateReferenceNo(): string {
    return uuidv4();
}

describe.skip('CancelOrder Tests', () => {
    test.skip('should successfully cancel order (in process)', async () => {
        const caseName = 'CancelOrderSuccessInProcess';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('CancelOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with user status abnormal', async () => {
        const caseName = 'CancelOrderFailUserStatusAbnormal';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('CancelOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with merchant status abnormal', async () => {
        const caseName = 'CancelOrderFailMerchantStatusAbnormal';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('CancelOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with missing parameter', async () => {
        const caseName = 'CancelOrderFailMissingParameter';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('CancelOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with order not exist', async () => {
        const caseName = 'CancelOrderFailOrderNotExist';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('CancelOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with exceed cancel window time', async () => {
        const caseName = 'CancelOrderFailExceedCancelWindowTime';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('CancelOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail not allowed by agreement', async () => {
        const caseName = 'CancelOrderFailNotAllowedByAgreement';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('CancelOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with account status abnormal', async () => {
        const caseName = 'CancelOrderFailAccountStatusAbnormal';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('CancelOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with insufficient merchant balance', async () => {
        const caseName = 'CancelOrderFailInsufficientMerchantBalance';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('CancelOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with order refunded', async () => {
        const caseName = 'CancelOrderFailOrderRefunded';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('CancelOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with invalid signature', async () => {
        const caseName = 'CancelOrderFailInvalidSignature';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('CancelOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with timeout', async () => {
        const caseName = 'CancelOrderFailTimeout';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('CancelOrder test is a placeholder.');
        } catch (e: any) { }
    });
});
