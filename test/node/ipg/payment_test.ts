import Dana from 'dana-node-api-client';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { fail } from 'assert';
import { getRequest } from '../helper/util';
import { assertResponse, assertFailResponse } from '../helper/assertion';

dotenv.config();

const titleCase = 'Payment';
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

describe.skip('Payment Tests', () => {
    test.skip('should successfully perform payment', async () => {
        const caseName = 'PaymentSuccess';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('Payment test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with invalid format', async () => {
        const caseName = 'PaymentFailInvalidFormat';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('Payment test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with missing or invalid mandatory field', async () => {
        const caseName = 'PaymentFailMissingOrInvalidMandatoryField';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('Payment test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with invalid signature', async () => {
        const caseName = 'PaymentFailInvalidSignature';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('Payment test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with general error', async () => {
        const caseName = 'PaymentFailGeneralError';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('Payment test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with transaction not permitted', async () => {
        const caseName = 'PaymentFailTransactionNotPermitted';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('Payment test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with merchant not exist or status abnormal', async () => {
        const caseName = 'PaymentFailMerchantNotExistOrStatusAbnormal';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('Payment test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with inconsistent request', async () => {
        const caseName = 'PaymentFailInconsistentRequest';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('Payment test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with internal server error', async () => {
        const caseName = 'PaymentFailInternalServerError';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('Payment test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with exceeds transaction amount limit', async () => {
        const caseName = 'PaymentFailExceedsTransactionAmountLimit';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('Payment test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with timeout', async () => {
        const caseName = 'PaymentFailTimeout';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('Payment test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with idempotent', async () => {
        const caseName = 'PaymentFailIdempotent';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('Payment test is a placeholder.');
        } catch (e: any) { }
    });
});
