import Dana from 'dana-node-api-client';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { fail } from 'assert';
import { getRequest } from '../helper/util';
import { assertResponse, assertFailResponse } from '../helper/assertion';

dotenv.config();

const titleCase = 'ApplyOtt';
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

describe.skip('ApplyOtt Tests', () => {
    test.skip('should successfully apply OTT', async () => {
        const caseName = 'ApplyOttSuccess';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            const response = await dana.ipgApi.applyOTT(requestData);
            await assertResponse(jsonPathFile, titleCase, caseName, response);
        } catch (e: any) {
            fail('ApplyOTT test failed: ' + (e.message || e));
        }
    });

    test.skip('should fail to apply OTT with invalid format', async () => {
        const caseName = 'ApplyOttFailInvalidFormat';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            const response = await dana.ipgApi.applyOTT(requestData);
            await assertFailResponse(jsonPathFile, titleCase, caseName, response);
            fail('Expected an error but the API call succeeded');
        } catch (e: any) { }
    });

    test.skip('should fail to apply OTT with missing or invalid mandatory field', async () => {
        const caseName = 'ApplyOttFailMissingOrInvalidMandatoryField';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            const response = await dana.ipgApi.applyOTT(requestData);
            await assertFailResponse(jsonPathFile, titleCase, caseName, response);
            fail('Expected an error but the API call succeeded');
        } catch (e: any) { }
    });

    test.skip('should fail to apply OTT with invalid signature', async () => {
        const caseName = 'ApplyOttFailInvalidSignature';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            const response = await dana.ipgApi.applyOTT(requestData);
            await assertFailResponse(jsonPathFile, titleCase, caseName, response);
            fail('Expected an error but the API call succeeded');
        } catch (e: any) { }
    });

    test.skip('should fail to apply OTT with token expired', async () => {
        const caseName = 'ApplyOttFailTokenExpired';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            const response = await dana.ipgApi.applyOTT(requestData);
            await assertFailResponse(jsonPathFile, titleCase, caseName, response);
            fail('Expected an error but the API call succeeded');
        } catch (e: any) { }
    });

    test.skip('should fail to apply OTT with token not found', async () => {
        const caseName = 'ApplyOttFailTokenNotFound';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            const response = await dana.ipgApi.applyOTT(requestData);
            await assertFailResponse(jsonPathFile, titleCase, caseName, response);
            fail('Expected an error but the API call succeeded');
        } catch (e: any) { }
    });

    test.skip('should fail to apply OTT with invalid user status', async () => {
        const caseName = 'ApplyOttFailInvalidUserStatus';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            const response = await dana.ipgApi.applyOTT(requestData);
            await assertFailResponse(jsonPathFile, titleCase, caseName, response);
            fail('Expected an error but the API call succeeded');
        } catch (e: any) { }
    });

    test.skip('should fail to apply OTT with non-retryable error', async () => {
        const caseName = 'ApplyOttFailNonRetryableError';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            const response = await dana.ipgApi.applyOTT(requestData);
            await assertFailResponse(jsonPathFile, titleCase, caseName, response);
            fail('Expected an error but the API call succeeded');
        } catch (e: any) { }
    });

    test.skip('should fail to apply OTT with internal server error', async () => {
        const caseName = 'ApplyOttFailInternalServerError';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            const response = await dana.ipgApi.applyOTT(requestData);
            await assertFailResponse(jsonPathFile, titleCase, caseName, response);
            fail('Expected an error but the API call succeeded');
        } catch (e: any) { }
    });

    test.skip('should fail to apply OTT with unexpected response', async () => {
        const caseName = 'ApplyOttFailUnexpectedResponse';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            const response = await dana.ipgApi.applyOTT(requestData);
            await assertFailResponse(jsonPathFile, titleCase, caseName, response);
            fail('Expected an error but the API call succeeded');
        } catch (e: any) { }
    });
});
