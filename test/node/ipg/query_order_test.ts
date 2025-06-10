import Dana from 'dana-node-api-client';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { fail } from 'assert';
import { getRequest } from '../helper/util';
import { assertResponse, assertFailResponse } from '../helper/assertion';

dotenv.config();

const titleCase = 'QueryOrder';
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

describe.skip('QueryOrder Tests', () => {
    test.skip('should successfully query order (paid)', async () => {
        const caseName = 'QueryOrderSuccessPaid';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('QueryOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should successfully query order (initiated)', async () => {
        const caseName = 'QueryOrderSuccessInitiated';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('QueryOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should successfully query order (paying)', async () => {
        const caseName = 'QueryOrderSuccessPaying';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('QueryOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should successfully query order (cancelled)', async () => {
        const caseName = 'QueryOrderSuccessCancelled';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('QueryOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with not found', async () => {
        const caseName = 'QueryOrderNotFound';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('QueryOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with invalid field', async () => {
        const caseName = 'QueryOrderFailInvalidField';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('QueryOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with invalid mandatory field', async () => {
        const caseName = 'QueryOrderFailInvalidMandatoryField';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('QueryOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with unauthorized', async () => {
        const caseName = 'QueryOrderFailUnauthorized';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('QueryOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with transaction not found', async () => {
        const caseName = 'QueryOrderFailTransactionNotFound';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('QueryOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with general error', async () => {
        const caseName = 'QueryOrderFailGeneralError';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('QueryOrder test is a placeholder.');
        } catch (e: any) { }
    });
});
