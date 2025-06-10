import Dana from 'dana-node-api-client';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { fail } from 'assert';
import { getRequest } from '../helper/util';
import { assertResponse, assertFailResponse } from '../helper/assertion';

dotenv.config();

const titleCase = 'RefundOrder';
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

describe.skip('RefundOrder Tests', () => {
    test.skip('should successfully refund order (in process)', async () => {
        const caseName = 'RefundInProcess';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('RefundOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with exceed payment amount', async () => {
        const caseName = 'RefundFailExceedPaymentAmount';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('RefundOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail not allowed by agreement', async () => {
        const caseName = 'RefundFailNotAllowedByAgreement';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('RefundOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with exceed refund window time', async () => {
        const caseName = 'RefundFailExceedRefundWindowTime';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('RefundOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with multiple refund not allowed', async () => {
        const caseName = 'RefundFailMultipleRefundNotAllowed';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('RefundOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with duplicate request', async () => {
        const caseName = 'RefundFailDuplicateRequest';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('RefundOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with order not paid', async () => {
        const caseName = 'RefundFailOrderNotPaid';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('RefundOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with parameter illegal', async () => {
        const caseName = 'RefundFailParameterIllegal';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('RefundOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with mandatory parameter invalid', async () => {
        const caseName = 'RefundFailMandatoryParameterInvalid';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('RefundOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with order not exist', async () => {
        const caseName = 'RefundFailOrderNotExist';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('RefundOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with insufficient merchant balance', async () => {
        const caseName = 'RefundFailInsufficientMerchantBalance';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('RefundOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with invalid signature', async () => {
        const caseName = 'RefundFailInvalidSignature';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('RefundOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with timeout', async () => {
        const caseName = 'RefundFailTimeout';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('RefundOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with idempotent', async () => {
        const caseName = 'RefundFailIdempotent';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('RefundOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with merchant status abnormal', async () => {
        const caseName = 'RefundFailMerchantStatusAbnormal';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('RefundOrder test is a placeholder.');
        } catch (e: any) { }
    });
});
