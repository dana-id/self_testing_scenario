import Dana from 'dana-node-api-client';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { fail } from 'assert';
import { getRequest } from '../helper/util';
import { assertResponse, assertFailResponse } from '../helper/assertion';

dotenv.config();

const titleCase = 'ApplyToken';
const jsonPathFile = path.resolve(__dirname, '../../../resource/request/components/IPG.json');

const dana = new Dana({
    partnerId: process.env.X_PARTNER_ID || '',
    privateKey: process.env.PRIVATE_KEY || '',
    origin: process.env.ORIGIN || '',
    env: process.env.ENV || 'sandbox',
});

// Utility function to generate unique reference numbers (if needed in future)
function generateReferenceNo(): string {
    return uuidv4();
}

describe.skip('ApplyToken Tests', () => {
    test.skip('should successfully apply token', async () => {
        const caseName = 'ApplyTokenSuccess';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            const response = await dana.ipgApi.applyToken(requestData);
            await assertResponse(jsonPathFile, titleCase, caseName, response);
        } catch (e: any) {
            fail('ApplyToken test failed: ' + (e.message || e));
        }
    });

    test.skip('should fail to apply token with expired authcode', async () => {
        const caseName = 'ApplyTokenFailExpiredAuthcode';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            const response = await dana.ipgApi.applyToken(requestData);
            await assertFailResponse(jsonPathFile, titleCase, caseName, response);
            fail('Expected an error but the API call succeeded');
        } catch (e: any) { }
    });

    test.skip('should fail to apply token with used authcode', async () => {
        const caseName = 'ApplyTokenFailAuthcodeUsed';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            const response = await dana.ipgApi.applyToken(requestData);
            await assertFailResponse(jsonPathFile, titleCase, caseName, response);
            fail('Expected an error but the API call succeeded');
        } catch (e: any) { }
    });

    test.skip('should fail to apply token with invalid authcode', async () => {
        const caseName = 'ApplyTokenFailAuthcodeInvalid';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            const response = await dana.ipgApi.applyToken(requestData);
            await assertFailResponse(jsonPathFile, titleCase, caseName, response);
            fail('Expected an error but the API call succeeded');
        } catch (e: any) { }
    });

    test.skip('should fail to apply token with invalid params', async () => {
        const caseName = 'ApplyTokenFailInvalidParams';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            const response = await dana.ipgApi.applyToken(requestData);
            await assertFailResponse(jsonPathFile, titleCase, caseName, response);
            fail('Expected an error but the API call succeeded');
        } catch (e: any) { }
    });

    test.skip('should fail to apply token with invalid mandatory fields', async () => {
        const caseName = 'ApplyTokenFailInvalidMandatoryFields';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            const response = await dana.ipgApi.applyToken(requestData);
            await assertFailResponse(jsonPathFile, titleCase, caseName, response);
            fail('Expected an error but the API call succeeded');
        } catch (e: any) { }
    });

    test.skip('should fail to apply token with invalid signature', async () => {
        const caseName = 'ApplyTokenFailInvalidSignature';
        const requestData: any = getRequest(jsonPathFile, titleCase, caseName);
        try {
            const response = await dana.ipgApi.applyToken(requestData);
            await assertFailResponse(jsonPathFile, titleCase, caseName, response);
            fail('Expected an error but the API call succeeded');
        } catch (e: any) { }
    });
});
